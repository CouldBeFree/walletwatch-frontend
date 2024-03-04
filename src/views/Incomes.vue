<template>
  <h1>Incomes</h1>
  <v-row align="start">
    <v-col xs="12" sm="12" md="5" lg="3">
      <UserIncomes
        :data="getAllIncomes"
        :userData="getUsersIncomes"
        :loading="loading"
        @delete="onDeleteIncomes"
        @create="onCreateIncome"
      />
    </v-col>
    <v-col xs="12" sm="12" md="7" lg="5">
      <TransactionIncomes
        :data="[]"
        :userData="[]"
        :loading="false"
        @update="() => {}"
        @create="() => {}"
        @delete="() => {}"
      />
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4"> <h1>Chart</h1></v-col>
  </v-row>
</template>

<script setup>
import UserIncomes from "@/components/Incomes/UserIncomes.vue";
import TransactionIncomes from "@/components/Incomes/TransactionIncomes.vue";
import useUserIncomes from "@/composable/Incomes/useUserIncomes";

const {
  loading,
  getUsersIncomes,
  getAllIncomes,
  onDeleteIncomes,
  onCreateIncome,
} = useUserIncomes();
</script>

<style scoped></style>
