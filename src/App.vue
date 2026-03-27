<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
  <div class="layout-principal">
    <!-- Header -->
    <TheHeader v-if="!$route.meta.hideHeader" />

    <!-- Conteúdo Dinâmico -->
    <main class="conteudo-dinamico">
      <router-view />
    </main>

    <!-- Footer  -->
    <TheFooter />
  </div>
</template>

<style scoped>
.layout-principal {
  background-color: var(--branco);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.conteudo-dinamico {
  flex: 1;
}
</style>
