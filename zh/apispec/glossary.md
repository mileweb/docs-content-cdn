# API spec glossary (English → 中文)

Use these terms in `translations.po`. They follow the existing Chinese docs (`zh/docs`,
including the page titles in `zh/docs/manifest.json`), so the API reference reads the same
as the rest of the site. Extend the table when a new term is settled.

| English | 中文 | Note |
|---|---|---|
| property | 加速项目 | "property version" → 加速项目版本 |
| property configuration | 加速项目配置 | |
| hostname | 加速域名 | 域名 when it is any DNS name, not one served by a property |
| edge hostname | 调度域名 | |
| origin | 源站 | |
| edge logic | 边缘逻辑 | |
| edge configuration | 边缘配置 | |
| edge server / edge node | 边缘服务器 / 边缘节点 | |
| deploy / deployment | 部署 | "deployment task" → 部署任务 |
| undeploy | 卸载 | |
| validation | 验证 | "validation task" → 验证任务 |
| staging (environment) | 演练环境 | |
| production (environment) | 生产环境 | |
| certificate | 证书 | server certificate → 服务端证书, CA certificate → CA 证书 |
| certificate version | 证书版本 | |
| auto-renew | 自动更新 | |
| secret | 保密信息 | |
| purge | 刷新 | purge request → 刷新请求 |
| prefetch | 预取 | |
| report | 报表 | |
| annotation | 注释 | |
| log configuration | 日志配置 | real-time log → 实时日志, access log → 访问日志 |
| log aggregation point | 日志汇聚点 | |
| server group | 服务器组 | |
| customer | 客户 | |
| child customer | 子客户 | |
| reseller | 代理商 | |
| portal | 控制台 | |
| portal user | 控制台用户 | |
| API account | API 账号 | |
| API key | API 密钥 | |
| role | 角色 | |
| service quota | 服务配额 | |
| webhook | Webhook | keep in English |
| request / response | 请求 / 响应 | |
| request header / response header | 请求头 / 响应头 | |
| client | 客户端 | |
| cache key | 缓存键 | |
| bandwidth | 带宽 | |
| traffic / traffic volume | 流量 | |
| standby action | 待命任务 | |
| ICP Beian | ICP 备案 | |
| shield, origin shield | Shield, 源站 Shield | keep "Shield" in English |
| Origin Fast Route | 回源快速通道 | |
| L7, layer 7 | 7 层 | |
| intermediate (layer) | 中间层 | |
| ISP | 运营商 | |
| test suite | 测试用例集 | |

## Style

- Keep in English: field and parameter names (`propertyId`, `hostnames`), enum values,
  HTTP methods, status codes, header names, product names (CDN Pro, Edge Logic only where
  it is a product name), and anything in `code` or `<code>`.
- Always put a space between Chinese and Latin text or numbers, including in the terms above: `CDN Pro 是`, `使用 version 字段`.
- Use Chinese full-width punctuation (，。：；（）) in Chinese sentences, but keep ASCII
  punctuation inside code, URLs and JSON.
- Address the reader as 您.
