export default defineNuxtPlugin((nuxtApp) => {
  const revealDirective = {
    mounted(el: HTMLElement, binding: { value?: { delay?: number } }) {
      el.classList.add('reveal')

      if (binding.value?.delay) {
        el.style.transitionDelay = `${binding.value.delay}ms`
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              io.unobserve(entry.target)
              // 进场结束后清除延迟，避免残留干扰后续悬浮等过渡
              setTimeout(() => {
                el.style.transitionDelay = ''
              }, 750)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )

      io.observe(el)
      ;(el as HTMLElement & { __revealIO?: IntersectionObserver }).__revealIO = io
    },
    unmounted(el: HTMLElement) {
      ;(el as HTMLElement & { __revealIO?: IntersectionObserver }).__revealIO?.disconnect()
    }
  }

  nuxtApp.vueApp.directive('reveal', revealDirective)
})