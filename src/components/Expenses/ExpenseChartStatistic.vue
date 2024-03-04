<template>
  <DoughnutChart :chartData="chartData" />
</template>

<script setup>
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed } from "vue";
import generateHex from "@/utils/generateHex";

Chart.register(...registerables);

const props = defineProps(["data"]);

const chartData = computed(() => {
  const labels = [];
  const data = [];
  const backgroundColor = [];

  console.log(props.data);

  props.data?.forEach((st) => {
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
</script>

<style scoped></style>
