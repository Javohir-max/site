// layouts/default.vue
<script setup lang="ts">

</script>
<template>
    <div>
        <Header />
        <main>
            <div class="container m-auto pt-4">
                <NuxtPage />
            </div>
        </main>
        <Footer />
    </div>
</template>
<style scoped lang="scss">
main {
    padding: 80px 0;
}

</style>