## AWS S3 Bucket Acceleration

Let’s assume we have a domain `waytoo.digital` and we would like to setup a bucket on its subdomain called `files.waytoo.digital`, so later our users can access the data in that bucket through this subdomain.

### Setting up a S3 Bucket

Log in to the AWS S3 console and create a new bucket. It will show you the creation wizard:

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-bucket.png" alt="create bucket" width="720"></p>

Enter Bucket Name(it should be qualified DNS prefix) - files-waytoo-digital in our case. Click Next. Skip "Configure Options".

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-bucket-set-permissions.png" alt="create bucket" width="720"></p>

For now, use default `“Block all public access”` permissions, or AWS doesn’t give you to click next. Click Next and Save. Now we have bucket creaated.

Assign appropriate permissions, so the content of a bucket can be accessed.
    
<p align=center><img src="/docs/resources/images/recipes/aws-bucket/modify-bucket-settings-permissions.png" alt="create bucket" width="720"></p>

Remove `"Block all public access"` checkbox and click save.

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/modify-bucket-settings-cors.png" alt="create bucket" width="720"></p>

Setup CORS. Just copy and paste code below:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

Upload a file to the bucket to test our setup and grant public read access to the uploaded object.

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/bucket-upload-file.png" alt="create bucket" width="720"></p>

Click on the uploaded file in bucket reveals the information we can use:

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/bucket-uploaded-file-info.png" alt="create bucket" width="500"></p>

Amazon S3 uses a convention for accessing the bucket names through URI: `<BUCKET_NAME>.<REGION>.amazonaws.com`. Currently, instead of the region, it returns us `s3`. Anyway, we just use the bucket domain name to setup the **CDN360**.
<br/>

### Setting up CDN360

Login to CDN360 management console at https://console.cdnetworks.com

#### Traffic Management 
Create an Edge Hostname in **“Traffic Management”**
   
<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-edge-hostname.png" alt="create bucket" width="720"></p>

After creating it, you can try it in terminal to make sure it works:

```bash
$ping files-waytoo-digital.qtlcdn.com
PING files-waytoo-digital.qtlcdn.com (14.0.119.186): 56 data bytes
64 bytes from 14.0.119.186: icmp_seq=0 ttl=56 time=3.775 ms
64 bytes from 14.0.119.186: icmp_seq=1 ttl=56 time=3.953 ms
64 bytes from 14.0.119.186: icmp_seq=2 ttl=56 time=3.739 ms
64 bytes from 14.0.119.186: icmp_seq=3 ttl=56 time=4.733 ms
```

#### Certificates 
Create a Certificate in **“Certificates”**
We are going to generate a certificate and sign it automatically with Let’s Encrypt

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-certificate.png" alt="create bucket" width="600"></p>

It’s dramatically easy to do. On **"Auto Generate Certificate"** tab, fill the *Certificate name* and *Certificate description* fields. Set *Auto Renew* to *Let’s Encrypt*. Then provide the *Common name* and *SAN* values. We just use `files.waytoo.digital` in both cases. Then click *“Save certificate”* certificate will be saved.

Deploy a Certificate to **Staging** environment
When the certificate had been saved it is now possible to deploy it. We going to deploy it to staging to test our setup prior to put it to production.

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/deploy-to-staging.png" alt="create bucket" width="500"></p>

#### Edge Configurations
Create a Property in **“Edge Configurations”**. 

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-property.png" alt="create bucket" width="720"></p>

We should fill in the *Property Name*, optionally a *Description* for the property, and the *Description* of the configuration version. Also, *Hostnames* field require at least one hostname entered. This is how the cache will identify and handle requests with property configuration.
    
Then we should add origin(our S3 bucket):

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-property-origin.png" alt="create bucket" width="720"></p>

*Origin name* will be used in edge-logic script, in our case it's called `aws_origin`, we also should add out S3 bucket domain(`files-waytoo-digital.s3.amazonaws.com`) to *Servers* field and click validate to check if everything is ok.

In advanced settings we should fill the *Host Header* with the origin hostname - `files-waytoo-digital.s3.amazonaws.com`. This value will be set as `Host` in request header between the **Edge** and the **Origin**. If we will not do that - the value of Host will be `files.waytoo.digital` and Amazon S3 will respond with `Bucket not found` error. So, that’s an important step. Click Save and we are done.

We have created an origin. Next, we should create an initial edge-logic configuration. Click Wizard button:

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-property-wizard.png" alt="create bucket" width="600"></p>

We just selecte previously configured origin, set cache time to 3600 minutes and ignore cache-control headers from origin to handle cache behavior on the edge. Click **"OK"**. Edge-logic script will be generated:

 ```nginx
     location / { #This is the default location.
      origin_pass aws_origin;
      proxy_cache_valid 3600m; #200, 301, and 302 responses will be cached for 3600m
      proxy_ignore_headers Cache-Control Expires; #This will force the cache server to ignore cache control headers from origin.
      }
 ```

 From now you can edit this script and setup any logic you want. Having all about there one small thing remaining for this property - Add the Certificate. Choose a certificate we have created and deployed to Staging previously.

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/create-property-tls.png" alt="create bucket" width="600"></p>
	
Click “Validate & Save” to check if everything configured correctly.

Deploy a Property to Staging.

If no issues occurred during the “Validate & Save” - congratulations. Now we can deploy property and test our Staging deployment.

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/deploy-to-staging.png" alt="create bucket" width="500"></p>

#### Testing(Staging) 

To test staging deployments we should know the staging servers IP addresses:

```bash
$ dig staging.qtlgslb.com
...
;; ANSWER SECTION:
staging.qtlgslb.com.    59  IN  A   163.171.228.89
staging.qtlgslb.com.    59  IN  A   163.171.230.47
...
```

Now, let's pick one of those adresses returned above and check if everything we have setup and deployed previously works.

```bash
❯ curl -I https://files.waytoo.digital/file_1m.bin --resolve files.waytoo.digital:443:163.171.228.89
HTTP/2 200
content-type: application/octet-stream
content-length: 1024000
x-amz-id-2: eQa0SXtgPk3A+jASSyarZLw6FgFtXg+7m+Br6Xr/YBXQ0aot/dBTKBf5QSoE0x8TwzqBKXJ+MBw=
x-amz-request-id: 4Z0SEN8YER8PBYAG
date: Fri, 16 Oct 2020 03:30:16 GMT
last-modified: Fri, 16 Oct 2020 02:36:45 GMT
etag: "fcaebe20d9b3e73086dcb0ba5def8e52"
x-cache-status: MISS
x-qtl-request-id: 4c394e8fd8cc514c5f1e437ac3daf969
x-via: 2.0 na-us-iad1-cache-0003 [MISS 200]
age: 19
server: QTL_Cache/1.2.03
accept-ranges: bytes
```

By requesting the same item again we will see that now cache status is **HIT**

```bash
❯ curl -I https://files.waytoo.digital/file_1m.bin --resolve files.waytoo.digital:443:163.171.228.89
HTTP/2 200
content-type: application/octet-stream
content-length: 1024000
x-amz-id-2: eQa0SXtgPk3A+jASSyarZLw6FgFtXg+7m+Br6Xr/YBXQ0aot/dBTKBf5QSoE0x8TwzqBKXJ+MBw=
x-amz-request-id: 4Z0SEN8YER8PBYAG
date: Fri, 16 Oct 2020 03:30:16 GMT
last-modified: Fri, 16 Oct 2020 02:36:45 GMT
etag: "fcaebe20d9b3e73086dcb0ba5def8e52"
x-cache-status: HIT
x-qtl-request-id: dfa55f3549ee4fd0824472f83d06c6c5
x-via: 2.0 na-us-iad1-cache-0003 [HIT]
age: 13
server: QTL_Cache/1.2.03
accept-ranges: bytes
```

Everything works as expected, so let's deploy everything to production.

#### Deployment to Production

To deploy configuration to production, we should do it both in **"Certificates"** and **"Edge Configurations"**. Navigate to **"Certificates"** first, select certificate, set *Deployment destination* to *Production* and click **"Deploy Configuration"**.

<p align=center><img src="/docs/resources/images/recipes/aws-bucket/deploy-to-production.png" alt="create bucket" width="500"></p>

Then navigate to **"Edge Configurations"** and do the same with your property. 

#### Testing(Production)

Before we can try it in production, we should Create/Change CNAME record of your DNS and point it to the *Edge Hostname* we have created in the beginning(`files-waytoo-digital.qtlcdn.com`)

```bash
❯ dig files.waytoo.digital
...
;; ANSWER SECTION:
files.waytoo.digital.	299	IN	CNAME	files-waytoo-digital.qtlcdn.com.
files-waytoo-digital.qtlcdn.com. 19 IN	A	14.0.119.186
...
```

Actually, you also can do use the production IP address to check if everything is ok before you will change the DNS record. Just like that:

```bash
❯ curl -I https://files.waytoo.digital/file_1m.bin --resolve files.waytoo.digital:443:14.0.119.186
HTTP/2 200
content-type: application/octet-stream
content-length: 1024000
x-amz-id-2: gdpoBl4Uk1FbJ6i8tMHXYZRcPxAAR9NTY/EziqHr6Kbrni887rU+suUINzNof4sltrCRCq4I4TE=
x-amz-request-id: C30F30F6BE2B081E
date: Fri, 16 Oct 2020 03:21:14 GMT
last-modified: Fri, 16 Oct 2020 02:36:45 GMT
etag: "fcaebe20d9b3e73086dcb0ba5def8e52"
x-cache-status: HIT
x-qtl-request-id: 16a3be4dfdc381e44b90c86bec087f47
x-via: 2.0 as-kr-icn1-cache-0003 [HIT]
age: 5575
server: QTL_Cache/1.2.03
accept-ranges: bytes
```

Congratulations. You've just accelerated Amazon S3 Bucket with **CDN360**