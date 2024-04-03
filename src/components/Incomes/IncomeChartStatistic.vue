<template>
  <div class="text-center">
    <p class="text-h4 mb-4">Total income {{ commaSeparator(totalCount) }}₴</p>
    <DoughnutChart :chartData="chartData" />
  </div>
</template>

<script setup>
import commaSeparator from "@/utils/commaSeparator";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed } from "vue";

Chart.register(...registerables);

const props = defineProps(["data"]);

const totalCount = computed(() => {
  let count = 0;
  props.data.forEach((item) => {
    count += item.amount_sum;
  });
  return count;
});

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
