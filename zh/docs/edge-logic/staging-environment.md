## 演练环境相关信息

当您创建或修改加速项配置时，您是在使用 NGINX 配置语言进行编码。总体上看，NGINX 配置语言属于[申诉式编程语言](https://tylermcginnis.com/imperative-vs-declarative-programming/)，因为它试图描述最终结果而不是描述处理每个请求的步骤。尽管它有它的好处，但它有时也会给使用者带来困惑。因为这种语言的某些部分实际上是 [命令式](https://tylermcginnis.com/imperative-vs-declarative-programming/)，其中最值得注意的是 [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)。对于某些复杂的配置，在部署到生产环境之前，我们需要一个工具来验证所写的 NGINX 配置是否满足需求。此时演练环境就可以派上用场了。

演练环境由数个与生产环境相独立的 CDN360 节点组成，您可以在这些服务器上测试加速项的配置。在将修改后的配置项部署到生产服务器之前，您可以在这些节点上进行完善的测试以便并确保您的加速项配置可以满足您的全部期望。这是演练环境最大的功能--作为您调试的代码的测试环境。您可以查阅 [CDN360 快速配置](</docs/getting-started.md#quick-start>) 以及 [如何使用演练环境进行测试](</docs/portal/edge-configurations/testing-property.md#testing-property-in-staging>) 来获取更多有关演练环境的相关信息。除了加速项的验证以外，您也可以在演练环境上进行文件推送功能的验证。如果您需要查找演练环境节点的 IP 地址，请在 bash 终端中运行“curl staging.qtlcdn.com”。
