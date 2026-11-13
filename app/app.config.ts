export default defineAppConfig({
  ui: {
    colors: {
      primary: 'ecl',
      neutral: 'zinc'
    },
    button: {
      // 覆盖 slots.base 是可靠的（字符串整体替换）；compoundVariants 在 v4 的主题
      // 合并中会被默认数组丢弃，不要用它——主按钮配色在 ecl-theme.css 组件接管层处理
      slots: {
        base: 'rounded-(--ecl-radius-control) font-medium inline-flex items-center justify-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-[color,background-color,box-shadow,transform] duration-150 ease-standard active:scale-[0.98]'
      }
    },
    input: {
      // USelect / UInput 走 input 主题；圆角与按钮对齐到 8px
      slots: {
        base: 'w-full rounded-(--ecl-radius-control) border-0 appearance-none placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75 transition-colors'
      }
    }
  }
})
