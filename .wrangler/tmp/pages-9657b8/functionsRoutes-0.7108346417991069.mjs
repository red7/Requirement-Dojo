import { onRequestOptions as __api_chat_js_onRequestOptions } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/chat.js"
import { onRequestPost as __api_chat_js_onRequestPost } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/chat.js"
import { onRequestGet as __api_database_js_onRequestGet } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/database.js"
import { onRequestOptions as __api_review_js_onRequestOptions } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/review.js"
import { onRequestPost as __api_review_js_onRequestPost } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/review.js"
import { onRequestGet as __hello_js_onRequestGet } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/hello.js"
import { onRequestPost as __hello_js_onRequestPost } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/hello.js"
import { onRequest as __hello_js_onRequest } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/hello.js"

export const routes = [
    {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_chat_js_onRequestOptions],
    },
  {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_js_onRequestPost],
    },
  {
      routePath: "/api/database",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_database_js_onRequestGet],
    },
  {
      routePath: "/api/review",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_review_js_onRequestOptions],
    },
  {
      routePath: "/api/review",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_review_js_onRequestPost],
    },
  {
      routePath: "/hello",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__hello_js_onRequestGet],
    },
  {
      routePath: "/hello",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__hello_js_onRequestPost],
    },
  {
      routePath: "/hello",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__hello_js_onRequest],
    },
  ]