<script setup>
import SplashScreen from '~/components/SplashScreen.vue';
import { useAuth } from './composables/useAuth';

const loading = ref(true);
const { started } = useAuth();

const getServer = async () => {
  setInterval(async () => {
    await started();
  }, 50000);
};

onMounted(async () => {
  const start = await started();
  loading.value = !start;
  getServer();
});
</script>

<template>
  <div>
    <!-- Всегда есть Nuxt -->
    <NuxtLayout name="default" />

    <!-- Оверлей поверх -->
    <Transition name="fade">
      <SplashScreen v-if="loading" class="overlay" />
    </Transition>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--color-1);
  background: var(--gradient);
}
</style>
