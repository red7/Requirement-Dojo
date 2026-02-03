import { onRequestOptions as __api_chat_js_onRequestOptions } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/chat.js"
import { onRequestPost as __api_chat_js_onRequestPost } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/chat.js"
import { onRequestOptions as __api_review_js_onRequestOptions } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/review.js"
import { onRequestPost as __api_review_js_onRequestPost } from "/Users/sinan/Library/CloudStorage/Dropbox/Public/RDojo/functions/api/review.js"

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
  ]