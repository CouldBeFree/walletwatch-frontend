<template>
  <v-row>
    <v-col cols="12" offset-sm="0" offset-md="0" offset-lg="1" offset-xl="3" sm="12" md="12" lg="10" xl="6">
      <div class="mb-6 text-center">
        <DateSelector @selectDate="onDateSelect" />
      </div>
      <div class="mb-6">
        <TransactionHistory :value="history" />
      </div>
      <TotalStatistic :expenseValue="expenseValue" :incomeValue="incomeValue" />
    </v-col>
  </v-row>
</template>

<script setup>
import { reactive } from "vue";
import TotalStatistic from "@/components/TotalStatistic/TotalStatistic.vue";
import DateSelector from "@/components/DateSelector/DateSelector.vue";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory.vue";

import useTransactionHistory from "@/composable/useTransactionHistory";
import useExpenseChart from "@/composable/Expenses/useExpenseChart";
import useIncomeChart from "@/composable/Incomes/useIncomeChart";

const { getStatistic: expenseValue, getData: getExpenseData } =
  useExpenseChart();
const { getStatistic: incomeValue, getData: getIncomeData } = useIncomeChart();
const { history, getTransactionHistory } = useTransactionHistory();

const selectedDate = reactive({});

const onDateSelect = (date) => {
  Object.assign(selectedDate, { ...date });
  getTransactionHistory(date);
  getExpenseData(date);
  getIncomeData(date);
};
</script>
