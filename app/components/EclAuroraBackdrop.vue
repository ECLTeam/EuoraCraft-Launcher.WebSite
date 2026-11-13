<template>
  <div
    class="ecl-site-backdrop"
    aria-hidden="true"
  >
    <div class="ecl-site-grid" />
    <div class="ecl-site-aurora" />
  </div>
</template>

<style scoped>
.ecl-site-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: var(--ecl-canvas);
}
/* 极淡的工程网格：自上而下淡出，提供纹理层次 */
.ecl-site-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--ecl-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--ecl-grid-line) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, black 40%, transparent 90%);
}
/* Absolutely 基线：顶部一条强调色柔光 */
.ecl-site-aurora {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(56% 42% at 50% -8%, var(--aurora-c1), transparent 72%),
    radial-gradient(30% 26% at 12% 4%, var(--aurora-c2), transparent 72%),
    radial-gradient(36% 30% at 88% 2%, var(--aurora-c3), transparent 74%);
}
</style>
