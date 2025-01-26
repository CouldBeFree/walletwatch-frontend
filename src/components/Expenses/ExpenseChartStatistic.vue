<template>
  <v-card class="pa-3">
    <div class="text-center">
      <p class="text-h4 mb-4">
        Загальні витрати {{ commaSeparator(totalCount) }}₴
      </p>
      <BarChart :chart-data="chartData" class="mt-8" />
      <SelectCategories
        @onSelect="emit('onSelect', $event)"
        class="mt-4"
        :categories="props.categories"
      />
    </div>
  </v-card>
</template>

<script setup>
import SelectCategories from "@/components/Expenses/SelectCategories.vue";
import commaSeparator from "@/utils/commaSeparator";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed } from "vue";
import { EXPENSE_COLORS } from "@/constants";

Chart.register(...registerables);

const props = defineProps(["data", "categories"]);
const emit = defineEmits(["onSelect"]);

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
        label: "Витрати",
        data,
        backgroundColor,
      },
    ],
  };
});
</script>

<style scoped></style>
