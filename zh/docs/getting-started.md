# 快速开始

使用 CDN Pro 加速和分发您的内容，包括以下步骤：

1. [登录](</docs/portal/accessing-portal/logging-in.md>)到控制台。
2. [创建加速项目](</docs/portal/edge-configurations/managing-properties.md>)，即需要部署到代理服务器的配置。
3. [修改加速项目](</docs/portal/edge-configurations/editing-properties.md>)。
4. [验证加速项目](</docs/portal/tasks/validations.md>)。
5. 可选：[将加速项目部署到演练环境服务器](</docs/portal/edge-configurations/deploying-property.md>)，并确认缓存行为符合预期。
6. [将加速项目部署到生产环境服务器](</docs/portal/edge-configurations/deploying-property.md>)，并确认缓存行为符合预期。如果您刚开始试用 CDN Pro，则必须先向部署在演练环境的域名至少发送5个请求后，才能部署到生产环境。
7. 为加速项目中的域名[创建调度域名](</docs/portal/traffic-management/creating-edge-hostname.md>)。
8. 修改您的 DNS 配置，添加一条 CNAME 记录，将您的域名指向调度域名。

下图展示了使用 CDN Pro 加速内容时需要遵循的步骤。

![null](</docs/resources/images/getting-started-flowchart.png>)

为帮助您快速上手，请观看[快速开始使用 CDN Pro](<https://www.{{siteDomain}}/wp-content/uploads/videos/cdnpro_v1.mp4>)。
