// src/main/frontend/src/setProxy.js

import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    "ws",
    createProxyMiddleware({
      target: "http://localhost:8080",
      ws: true, // 웹소켓을 사용하겠다!
    })
  );
}
