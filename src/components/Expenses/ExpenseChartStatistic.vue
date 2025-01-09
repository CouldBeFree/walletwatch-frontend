<template>
  <div class="text-center">
    <p class="text-h4 mb-4">
      Загальні витрати {{ commaSeparator(totalCount) }}₴
    </p>
    <DoughnutChart :chartData="chartData" />
  </div>
</template>

<script setup>
import commaSeparator from "@/utils/commaSeparator";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed } from "vue";
import { EXPENSE_COLORS } from "@/constants";

Chart.register(...registerables);

const props = defineProps(["data"]);

const totalCount = computed(() => {
  let count = 0;
  props.data.forEach((item) => {
    count += item.totalAmount;
  });
  return count;
});

const chartData = computed(() => {
  const labels = [];
  const data = [];
  const backgroundColor = [];

  props.data?.forEach((st) => {
    const categoryName = st.categoryName;
    labels.push(categoryName);
    data.push(st.totalAmount);
    backgroundColor.push(EXPENSE_COLORS[categoryName]);
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
