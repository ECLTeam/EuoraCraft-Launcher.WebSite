export default defineAppConfig({
  ui: {
    colors: {
      primary: 'ecl',
      neutral: 'slate'
    },
    button: {
      compoundVariants: [{ color: 'primary', variant: 'solid', class: 'bg-(--ecl-action) hover:bg-(--ecl-primary-active) text-white' }]
    }
  }
})
