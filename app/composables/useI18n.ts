// 轻量 i18n：官网为纯客户端静态站，无需 vue-i18n 的懒加载运行时，直接内联同步字典更稳定。
// 语言由 URL 决定（/en/* 为英文，其余为中文），SSR 与客户端始终一致，便于搜索引擎区分两种版本。
import zhCN from '~/locales/zh-CN.json'
import enUS from '~/locales/en-US.json'

type Dict = typeof zhCN

const dictionaries: Record<string, Dict> = {
  'zh-CN': zhCN,
  'en-US': enUS
}

function resolve(dict: Dict, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, dict)
  return typeof value === 'string' ? value : path
}

export function useI18n() {
  const route = useRoute()
  const locale = computed(() => (route.meta.locale as string | undefined) ?? 'zh-CN')
  function t(path: string, params?: Record<string, string | number>): string {
    const dict = dictionaries[locale.value] ?? zhCN
    let text = resolve(dict, path)
    if (params) {
      text = text.replace(/\{(\w+)\}/g, (match, key) => params[key] !== undefined ? String(params[key]) : match)
    }
    return text
  }
  return { t, locale }
}

/** 把站内路径转换成当前语言对应的地址（英文页面统一加 /en 前缀） */
export function useLocalePath() {
  const route = useRoute()
  return (path: string) => {
    if (route.meta.locale !== 'en-US') return path
    return path === '/' ? '/en' : `/en${path}`
  }
}

/** 语言切换：跳到目标语言的同一页面，而不是在当前页原地换文案 */
export function useLocaleSwitch() {
  const route = useRoute()
  const router = useRouter()
  return async (target: string) => {
    const current = route.path.startsWith('/en') ? route.path.replace(/^\/en/, '') || '/' : route.path
    const next = target === 'en-US'
      ? (current === '/' ? '/en' : `/en${current}`)
      : current
    if (next !== route.path) await router.push(next)
  }
}
