<template>
  <DoughnutChart :chartData="chartData" />
</template>

<script setup>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed, onMounted, reactive } from "vue";
import ExpenseService from "@/service/apiService/ExpenseService";
import generateHex from "@/utils/generateHex";

Chart.register(...registerables);

const statistic = reactive({ data: [] });

const chartData = computed(() => {
  const labels = [];
  const data = [];
  const backgroundColor = [];

  statistic.data.forEach((st) => {
    labels.push(st.expenses_category_name);
    data.push(st.amount_sum);
    backgroundColor.push(generateHex());
  });

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
      },
    ],
  };
});

onMounted(async () => {
  const { data } = await ExpenseService.getStatisticByDate();
  Object.assign(statistic.data, data);
});
</script>

<style scoped></style>
