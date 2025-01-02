<template>
  <h1>Expense</h1>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {onMounted} from "vue";
const route = useRoute()

onMounted(() => {
  const id = route.params.id;
  console.log(id);
})
</script>

<style scoped>

</style>
