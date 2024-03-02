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
      <TransactionExpenses
        :data="getUsersTransactions"
        :userData="getUsersExpenses"
        :loading="transactionLoading"
        @update="onUpdateUsersExpense"
        @create="onCreateUsersExpense"
        @delete="onDeleteUsersExpense"
      />
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4">
      <ExpenseChartStatistic :data="getStatistic" />
    </v-col>
  </v-row>
</template>

<script setup>
import ExpenseChartStatistic from "@/components/ExpenseChartStatistic.vue";
import UserExpenses from "@/components/UserExpenses.vue";
import TransactionExpenses from "@/components/TransactionExpenses.vue";
import useUserExpenses from "@/composable/Expenses/useUserExpenses";
import useTransactionExpenses from "@/composable/Expenses/useTransactionExpenses";
import useExpenseChart from "@/composable/Expenses/useExpenseChart";

const {
  getAllExpenses,
  getUsersExpenses,
  loading: expenseLoading,
  onDeleteExpense,
  onCreateExpense,
} = useUserExpenses();

const {
  getUsersTransactions,
  onUpdate,
  onCreate,
  onDelete,
  loading: transactionLoading,
} = useTransactionExpenses();

const { getStatistic, getData } = useExpenseChart();

const onUpdateUsersExpense = (value) => {
  onUpdate(value).then(() => getData());
};

const onCreateUsersExpense = (value) => {
  onCreate(value).then(() => getData());
};

const onDeleteUsersExpense = (id) => {
  onDelete(id).then(() => getData());
};
</script>

<style scoped></style>
