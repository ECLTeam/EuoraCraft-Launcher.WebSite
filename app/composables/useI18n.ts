// 轻量 i18n：官网为纯客户端静态站，无需 vue-i18n 的懒加载运行时，直接内联同步字典更稳定。
import zhCN from '~/locales/zh-CN.json'
import enUS from '~/locales/en-US.json'

type Dict = typeof zhCN

const dictionaries: Record<string, Dict> = {
  'zh-CN': zhCN,
  'en-US': enUS
}

const STORAGE_KEY = 'ecl-locale'

// 模块级 ref：全站共享同一语言状态；类型放宽为 string 以兼容 USelect 的 v-model
export const locale = ref<string>('zh-CN')

if (import.meta.client) {
  locale.value = localStorage.getItem(STORAGE_KEY) === 'en-US' ? 'en-US' : 'zh-CN'
  document.documentElement.lang = locale.value
}

watch(locale, (code) => {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_KEY, code)
  document.documentElement.lang = code
})

function resolve(dict: Dict, path: string): string {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, dict)
  return typeof value === 'string' ? value : path
}

export function t(path: string, params?: Record<string, string | number>): string {
  const dict = dictionaries[locale.value] ?? zhCN
  let text = resolve(dict, path)
  if (params) {
    text = text.replace(/\{(\w+)\}/g, (match, key) =>
      params[key] !== undefined ? String(params[key]) : match)
  }
  return text
}

export function useI18n() {
  return { t, locale }
}
