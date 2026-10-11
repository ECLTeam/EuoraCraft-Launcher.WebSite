// 轻量 i18n：官网为纯客户端静态站，无需 vue-i18n 的懒加载运行时，直接内联同步字典更稳定。
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
  const locale = useState<string>('ecl-locale', () => 'zh-CN')
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
