## API Rate Limiting

To prevent API servers from being overwhelmed, the CDN Pro API enforces a limit on the number
of requests that customers can send per minute. If a customer sends too many requests, API rate limiting
throttles the customer by returning error messages with HTTP status code 429.

### Token Bucket Algorithm

CDN Pro uses the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket) to enforce rate limiting.
The token bucket algorithm is based on an analogy of a fixed capacity bucket into which tokens are added at a
fixed rate. Before allowing an API request to proceed, the bucket is inspected to see whether it contains at least
one token. If it does, one token is removed from the bucket and the API request is allowed to proceed. If there
is not a sufficient number of tokens available, the request is blocked, with an error that says the quota
has been exceeded during the 1-minute sliding window.

The capacity of the bucket and the filling rate are controlled by the `configs.apiMaxBurst` and `configs.apiRate` fields
in the [customer management API](</apidocs#operation/patch-ngadmin-customers-id>). For example,
if the customer has `configs.apiMaxBurst = 45` and `configs.apiRate = 120`, tokens are added to the bucket at a
fixed rate of 120 tokens per minute, and the total capacity of the bucket is 45. The bucket is refilled in a
“greedy” manner. CDN Pro tries to add tokens to the bucket as soon as possible. For example, refilling at
"120 tokens per minute" adds 1 token  every 500 milliseconds. In other words, the refill does not wait a full
minute to regenerate a bunch of 120 tokens.

### Indicator and Error Handling

After the token gets consumed, an `x-rate-limit-remaining: X` header is added to the API call’s HTTP response,
indicating the number of tokens remaining in the bucket. This header represents the remaining quota of API requests
a customer can make at this time. Failed or malformed requests consume one token from the bucket as well.
If there is not a sufficient number of tokens in the bucket, the API gateway returns an HTTP 429 error with
response header `x-rate-limit-retry-after-seconds: Y` to tell the client to retry after Y seconds.

### Best Practices for Avoiding Rate Limiting Errors

1. Check the API request history. [“GET /ngadmin/apicalls”](</apidocs#operation/get-ngadmin-apicalls>)
shows the API calls you have made.  (The customer admin API credential is required to call this API.)
Carefully check the records for potential abuses.

2. Reduce the number of requests by using APIs that are more suitable for the scenario or by combining similar
requests into one. For example, if you want to monitor the traffic volume of a list of domains, an ineffective approach is:

```
	for domain in domain_list:
	    call GET /cdn/report/vol 
	    	 {filters: {hostnames: [$domain]}}
```

   Instead, use the following recommended approach:

```
	POST /cdn/report/volSummary 
	     {filters: {hostnames: [$domain_list]}, groupBy: [hostnames]}
```

   Another example is purging multiple files in one request instead of making an API call for each purge URL.
   If there are thousands of purge URLs that follow a certain pattern, use directory or regex purge by specifying
   the `dirUrls` or `regexPatterns` fields when [creating a purge request](</apidocs#operation/createPurge>). The number of requests should not scale as you acquire more domains, properties, and other resources.

3. If you call the API through scripts, it should be resilient to intermittent or non-specific errors. The script
should honor the `x-rate-limit-retry-after-seconds` header and retry the request after a delay. Consider including a
process in your code that regulates the rate of your requests so that they are distributed evenly over time. 

4. If a problem persists, contact our [technical support team](mailto:support@cdnetworks.com).
If there is a legitimate need to increase the rate limit or burst ceiling, the technical support team will evaluate your requirements and raise the threshold.

### Notes

1. Rate limiting applies at the customer level. All API accounts under the same customer share the same token bucket. Excessive use of one account exhausts the customer’s quota. The rate limits of a reseller's children are independent of each other. In addition, the children’s API calls will not use the parent’s quota.

2. Because the CDN Pro portal calls the APIs, operations in the portal UI also consume the API rate limit tokens. 

3. Unauthorized API calls such as signups and login attempts consume tokens from the bucket corresponding to the client’s IP address. This bucket has a default capacity of 30 tokens and a refill rate of 60 per minute.

4. Modifications to the `configs.apiRate` and `configs.apiMaxBurst` using the [customer management API](</apidocs#operation/patch-ngadmin-customers-id>) do not take effect immediately. It typically takes 10-15 minutes to change the refill rate and refill the bucket.
