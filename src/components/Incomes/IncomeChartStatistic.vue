<template>
  <DoughnutChart :chartData="chartData" />
</template>

<script setup>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed } from "vue";

Chart.register(...registerables);

const props = defineProps(["data"]);

const chartData = computed(() => {
  const labels = [];
  const data = [];
  const backgroundColor = [];

  props.data?.forEach((st) => {
    labels.push(st.income_category_name);
    data.push(st.amount_sum);
    backgroundColor.push(st.color);
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
</script>

<style scoped></style>
