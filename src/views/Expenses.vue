<template>
  <v-row align="start">
    <v-col xs="12" sm="7" md="7" lg="7">
      <div class="mb-6">
        <DateSelector @selectDate="onDateSelect" />
      </div>
      <TransactionExpenses
        :data="getAllExpenses"
        :categories="getUserExpenseCategories"
        :loading="loading"
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
import useExpenseChart from "@/composable/Expenses/useExpenseChart";
import DateSelector from "@/components/DateSelector/DateSelector.vue";
import { onMounted, reactive } from "vue";
import useDateSelector from "@/composable/useDateSelector";

const { getUserExpenseCategories, getAllExpenses, getLoading: loading, getUserTransactions, onCreateExpense, onDeleteExpense, onUpdateExpense } = useUserExpenses();

const { getStatistic, getData } = useExpenseChart();
const { getDate } = useDateSelector();

const selectedDate = reactive(getDate("month"));

onMounted(() => {
  getUserTransactions(selectedDate);
});

const updateData = async (date) => {
  await getUserTransactions(date);
  await getData(date);
}

const onDateSelect = async (value) => {
  Object.assign(selectedDate, { ...value });
  await updateData(value);
};

const onDeleteUsersExpense = async (id) => {
  await onDeleteExpense(id);
  await updateData(selectedDate);
};

const onCreateUsersExpense = async (value) => {
  await onCreateExpense(value);
  await updateData(selectedDate);
};

const onUpdateUsersExpense = async (value) => {
  await onUpdateExpense(value);
  await updateData(selectedDate);
};
</script>

<style scoped></style>
