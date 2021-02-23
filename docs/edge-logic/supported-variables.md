## Supported Variables

CDN360 EdgeLogic directives support open-source Nginx defined [variables](http://nginx.org/en/docs/varindex.html).  For the advanced and proprietary directives, CDNetworks also introduced the following directive variables:

| **Variable** | **Description** |
| ---- | ---- |
| $cache_misc | A variable for adding additional information to default cache-key |
| $client_real_ip | Client’s IP address |
| $client_country_code | Client’s ISO 3166 country code |
| $request_scheme | Scheme used by client |
| $sorted_querystring_arg | Variable provides a (ASCII based) sorted list of input query parameters <br> Modifiable by directive 'sorted_querystring_filter_parameter' |
| $time_rfc822 | Variable to keep the current time in the RFC822 time zone format <br> - for example: "Mon, 28 Sep 1970 06:00:00 GMT" |
