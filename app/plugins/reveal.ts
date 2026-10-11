export default defineNuxtPlugin((nuxtApp) => {
  const observers = new WeakMap<HTMLElement, IntersectionObserver>()
  const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>()
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() { return {} },
    mounted(el: HTMLElement, binding: { value?: { delay?: number } }) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.classList.add('reveal')
      if (binding.value?.delay) el.style.transitionDelay = `${binding.value.delay}ms`
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some(entry => entry.isIntersecting)) return
        el.classList.add('is-revealed')
        observer.disconnect()
        timers.set(el, setTimeout(() => {
          el.style.transitionDelay = ''
          el.style.willChange = 'auto'
        }, 650))
      }, { threshold: 0.08 })
      observer.observe(el)
      observers.set(el, observer)
    },
    unmounted(el: HTMLElement) {
      observers.get(el)?.disconnect()
      clearTimeout(timers.get(el))
    }
  })
})
