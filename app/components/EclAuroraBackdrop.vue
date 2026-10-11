<template>
  <div
    class="ecl-site-backdrop"
    aria-hidden="true"
  >
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
.ecl-site-aurora {
  position: absolute;
  inset: -12%;
  opacity: 0.35;
  background-image:
    radial-gradient(42% 55% at 18% 22%, var(--aurora-c1), transparent 70%),
    radial-gradient(38% 50% at 82% 30%, var(--aurora-c2), transparent 70%),
    radial-gradient(50% 60% at 62% 88%, var(--aurora-c3), transparent 72%);
  animation: aurora-drift 22s linear infinite alternate;
}
@keyframes aurora-drift {
  from {
    transform: translate3d(-1.5%, -1%, 0) scale(1);
  }
  to {
    transform: translate3d(1.5%, 1%, 0) scale(1.04);
  }
}
@media (prefers-reduced-motion: reduce) {
  .ecl-site-aurora {
    animation: none;
  }
}
</style>
