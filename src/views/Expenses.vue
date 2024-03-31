<template>
  <div class="mb-6">
    <DateSelector @selectDate="onDateSelect" />
  </div>
  <v-row align="start">
    <v-col xs="12" sm="7" md="7" lg="7">
      <TransactionExpenses
        :data="getUsersTransactions"
        :userData="getUsersExpenses"
        :loading="transactionLoading"
        @update="onUpdateUsersExpense"
        @create="onCreateUsersExpense"
        @delete="onDeleteUsersExpense"
      />
    </v-col>
    <v-col xs="12" sm="5" md="5" lg="5">
      <ExpenseChartStatistic :data="getStatistic" />
    </v-col>
  </v-row>
</template>

<script setup>
import ExpenseChartStatistic from "@/components/Expenses/ExpenseChartStatistic.vue";
import TransactionExpenses from "@/components/Expenses/TransactionExpenses.vue";
import useUserExpenses from "@/composable/Expenses/useUserExpenses";
import useTransactionExpenses from "@/composable/Expenses/useTransactionExpenses";
import useExpenseChart from "@/composable/Expenses/useExpenseChart";
import DateSelector from "@/components/DateSelector/DateSelector.vue";
import { reactive } from "vue";
import useDateSelector from "@/composable/useDateSelector";

const { getUsersExpenses } = useUserExpenses();

const {
  getUsersTransactions,
  onUpdate,
  onCreate,
  onDelete,
  updateTransactionExpenses,
  loading: transactionLoading,
} = useTransactionExpenses();

const { getStatistic, getData } = useExpenseChart();
const { getDate } = useDateSelector();

const selectedDate = reactive(getDate("month"));

const onDateSelect = async (value) => {
  Object.assign(selectedDate, { ...value });
  await updateTransactionExpenses(value);
  await getData(value);
};

const onUpdateUsersExpense = async (value) => {
  onUpdate(value).then(() => {
    updateTransactionExpenses(selectedDate);
    getData(selectedDate);
  });
};

const onCreateUsersExpense = (value) => {
  onCreate(value).then(() => {
    updateTransactionExpenses(selectedDate);
    getData(selectedDate);
  });
};

const onDeleteUsersExpense = (id) => {
  onDelete(id).then(() => {
    updateTransactionExpenses(selectedDate);
    getData(selectedDate);
  });
};
</script>

<style scoped></style>
