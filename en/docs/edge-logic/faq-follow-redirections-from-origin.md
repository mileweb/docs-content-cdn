## How to follow redirections from origin?

When the origin responds with a 30x redirect, you may want the CDN servers to chase it until the redirection stops. Passing the redirection to the client takes more time to get the final content. If you want to turn on this feature, use the directive [`origin_follow_redirect`](</docs/edge-logic/supported-directives.md#origin_follow_redirect>) in the location where it is needed.

