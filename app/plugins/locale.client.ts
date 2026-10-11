export default defineNuxtPlugin((nuxtApp) => {
  const { locale } = useI18n()
  // Restore after hydration to match the prerendered Chinese document.
  nuxtApp.hook('app:mounted', () => {
    try {
      locale.value = localStorage.getItem('ecl-locale') === 'en-US' ? 'en-US' : 'zh-CN'
    } catch { /* Optional preference; storage may be unavailable. */ }
    watch(locale, (code) => {
      try {
        localStorage.setItem('ecl-locale', code)
      } catch { /* Optional preference. */ }
    })
  })
})
