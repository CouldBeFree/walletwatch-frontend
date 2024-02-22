<template>
  <h1>Expenses</h1>
  <v-row
    align="start"
    no-gutters
  >
    <v-col lg="3">
      <UserExpenses />
    </v-col>
  </v-row>
</template>

<script setup>
  import UserExpenses from "@/components/UserExpenses.vue";
</script>

<style scoped>

</style>
