<template>
  <div class="starting">
    <div class="loader"></div>
  </div>
</template>

<style scoped lang="scss">
.starting {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--color-1);
  background: var(--gradient);

  .loader {
    width: fit-content;
    color: #3498db;
    font-weight: bold;
    font-family: monospace;
    font-size: 4rem;
    clip-path: inset(0 100% 0 0);
    animation: started 2s steps(12) infinite;
  }

  .loader:before {
    content:"Starting..."
  }

  @keyframes started { to { clip-path: inset(0 -1ch 0 0) } }
}
</style>
