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

  // 「页面浏览」展示地址：读入 useRuntimeConfig().public.showcaseUrl。
  // 默认指向前端展示站，需被 iframe 嵌入的目标不得设置 X-Frame-Options/限制性 frame-ancestors；
  // 构建时可用 NUXT_PUBLIC_SHOWCASE_URL 覆盖
  runtimeConfig: {
    public: {
      showcaseUrl: process.env.NUXT_PUBLIC_SHOWCASE_URL || 'https://frontend.eclteam.top/'
    }
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
