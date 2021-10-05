## 演练环境相关信息

当您创建或修改加速项配置时，您需要使用 NGINX 配置语言来描述边缘逻辑。总体上看，NGINX 配置语言属于[声明式(declarative)编程语言](https://tylermcginnis.com/imperative-vs-declarative-programming/)，因为它试图描述最终结果而不是按顺序描述处理每个请求的步骤。尽管有其简洁明了的优势，但它有时也会给使用者带来困惑。同时这种语言的某些部分实际上又是 [顺序式(imperative)的](https://tylermcginnis.com/imperative-vs-declarative-programming/)，特别是 [rewrite 模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)里的指令。对于某些复杂的配置，在部署到生产环境之前，我们往往会需要一个工具来验证所写边缘逻辑是否满足需求。此时演练环境就可以派上用场了。

演练环境由数个与生产环境相独立的节点组成。在将修改后的配置项部署到生产服务器之前，您可以在这些节点上进行充分的测试以确保新配置可以满足您的全部期望。这就像您使用其他语言编程时经常用到的测试环境。您可以查阅 [CDN360 快速配置](</docs/getting-started.md#quick-start>) 以及 [如何使用演练环境进行测试](</docs/portal/edge-configurations/testing-property.md#testing-property-in-staging>) 来获取更多有关演练环境的相关信息。除了加速项的验证以外，您也可以在演练环境上进行文件推送功能的验证。如果您需要查找演练环境节点的 IP 地址，请用浏览器或者curl工具查看这个网址： [staging.qtlcdn.com](https://staging.qtlcdn.com)。
