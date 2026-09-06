// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/content'],

  // 纯客户端渲染（SPA）：构建产物为静态文件，无需 Node 运行时，可部署到任意静态托管
  ssr: false,

  devtools: {
    enabled: true
  },

  // 全站页面切换统一使用强调缓动曲线（风格见 assets/css/main.css）
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },

  css: ['~/assets/css/main.css'],

  // 「页面浏览」展示地址：由构建时的 NUXT_PUBLIC_SHOWCASE_URL 注入到
  // useRuntimeConfig().public.showcaseUrl，未设置时 /showcase 显示占位
  runtimeConfig: {
    public: {}
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
