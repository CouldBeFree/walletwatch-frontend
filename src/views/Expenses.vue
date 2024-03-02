<template>
  <h1>Expenses</h1>
  <v-row align="start">
    <v-col xs="12" sm="12" md="5" lg="3">
      <UserExpenses
        :data="getAllExpenses"
        :userData="getUsersExpenses"
        :loading="expenseLoading"
        @delete="onDeleteExpense"
        @create="onCreateExpense"
      />
    </v-col>
    <v-col xs="12" sm="12" md="7" lg="5">
      <ul>
        <li v-for="item in getUsersExpenses" :key="item.id">{{item}}</li>
      </ul>
      <hr>
      <ul>
        <li v-for="item in getUsersTransactions" :key="item.id">{{item}}</li>
      </ul>
      <TransactionExpenses
        :data="getUsersTransactions"
        :userData="getUsersExpenses"
        @update="onUpdate"
        @create="onCreate"
      />
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4">
      <ExpenseChartStatistic />
    </v-col>
  </v-row>
</template>

<script setup>
import ExpenseChartStatistic from "@/components/ExpenseChartStatistic.vue";
import UserExpenses from "@/components/UserExpenses.vue";
import TransactionExpenses from "@/components/TransactionExpenses.vue";
import useUserExpenses from "@/composable/Expenses/useUserExpenses";
import useTransactionExpenses from "@/composable/Expenses/useTransactionExpenses";

const {
  getAllExpenses,
  getUsersExpenses,
  loading: expenseLoading,
  onDeleteExpense,
  onCreateExpense,
} = useUserExpenses();

const { getUsersTransactions, onUpdate, onCreate } = useTransactionExpenses();
</script>

<style scoped></style>
