<template>
  <router-view #="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

defineComponent({
  name: "App",
});
</script>

<style></style>
