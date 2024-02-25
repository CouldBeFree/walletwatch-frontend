<template>
  <h1>Expenses</h1>
  <v-row
    align="start"
  >
    <v-col lg="3">
      <UserExpenses />
    </v-col>
    <v-col lg="5">
      <TransactionExpenses />
    </v-col>
  </v-row>
</template>

<script setup>
  import UserExpenses from "@/components/UserExpenses.vue";
  import TransactionExpenses from "@/components/TransactionExpenses.vue";
</script>

<style scoped>

</style>
