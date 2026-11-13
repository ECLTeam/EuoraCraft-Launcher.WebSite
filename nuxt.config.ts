// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/content', '@nuxt/image'],

  // Generate complete marketing HTML while deploying only static files.
  ssr: true,

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
  ui: { fonts: false },

  // 「页面浏览」展示地址：读入 useRuntimeConfig().public.showcaseUrl。
  // 默认指向前端展示站，需被 iframe 嵌入的目标不得设置 X-Frame-Options/限制性 frame-ancestors；
  // 构建时可用 NUXT_PUBLIC_SHOWCASE_URL 覆盖
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.euora.cn',
      // 构建时可用 NUXT_PUBLIC_SHOWCASE_URL 覆盖；globalThis 读取以规避配置文件的 node 类型依赖
      showcaseUrl:
        (globalThis as { process?: { env?: Record<string, string> } }).process?.env
          ?.NUXT_PUBLIC_SHOWCASE_URL || 'https://frontend.euora.cn/'
    }
  },

  compatibilityDate: '2026-06-30',
  nitro: {
    output: { publicDir: 'dist' },
    prerender: {
      routes: [
        '/', '/features', '/download', '/docs', '/showcase', '/about',
        '/en', '/en/features', '/en/download', '/en/docs', '/en/showcase', '/en/about'
      ],
      failOnError: true
    }
  },
  // 为每个页面克隆一份 /en 前缀的英文路由：两种语言各自拥有独立 URL，
  // SSR / SSG 时按 route.meta.locale 直接输出对应语言，canonical 与 hreflang 才有意义
  hooks: {
    'pages:extend'(pages) {
      const english = pages
        .filter(page => !page.path.startsWith('/en'))
        .map((page) => {
          const clone = { ...page }
          clone.path = page.path === '/' ? '/en' : `/en${page.path}`
          if (page.name) clone.name = `${page.name}-en`
          clone.meta = { ...page.meta, locale: 'en-US' }
          return clone
        })
      pages.push(...english)
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
      // Feature icons referenced through locale dictionaries need an explicit bundle entry.
      icons: ['lucide:boxes', 'lucide:palette', 'lucide:wifi', 'lucide:users', 'lucide:puzzle', 'lucide:box', 'lucide:languages', 'lucide:search', 'lucide:coffee', 'lucide:bug', 'lucide:wrench', 'lucide:refresh-cw', 'lucide:file-text']
    }
  },
  image: { format: ['webp'], quality: 85 }
})
