<template>
  <v-card class="pb-6 pt-5">
    <p
      class="text-h3 text-center mb-5 text-red-darken-3"
      :class="{
        'text-red-darken-3': total < 0,
        'text-green-darken-3': total >= 0,
      }"
    >
      Overall {{ total }} ₴
    </p>
    <v-row align="start">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <ExpenseChartStatistic :data="expenseValue" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <IncomeChartStatistic :data="incomeValue" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import ExpenseChartStatistic from "@/components/Expenses/ExpenseChartStatistic.vue";
import useExpenseChart from "@/composable/Expenses/useExpenseChart";
import useIncomeChart from "@/composable/Incomes/useIncomeChart";
import IncomeChartStatistic from "@/components/Incomes/IncomeChartStatistic.vue";
import calculateTotal from "@/utils/calculateTotal";
import { computed, watch } from "vue";

const { getStatistic: expenseValue, getData: getExpenseData } =
  useExpenseChart();
const { getStatistic: incomeValue, getData: getIncomeData } = useIncomeChart();

const props = defineProps(["date"]);

watch(
  props.date,
  (newType) => {
    getExpenseData(newType);
    getIncomeData(newType);
  },
  {
    deep: true,
  },
);

const total = computed(() => {
  return calculateTotal(incomeValue.value) - calculateTotal(expenseValue.value);
});
</script>

<style scoped></style>
