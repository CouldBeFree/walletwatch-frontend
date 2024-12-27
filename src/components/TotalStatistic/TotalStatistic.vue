<template>
  <v-card class="pb-6 pt-5" :loading="false">
    <p
      class="text-h3 text-center mb-5 text-red-darken-3"
      :class="{
        'text-red-darken-3': total < 0,
        'text-green-darken-3': total >= 0,
      }"
    >
      Підсумок {{ commaSeparator(total) }} ₴
    </p>
    <v-row align="start">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <ExpenseChartStatistic :data="props.expenseValue" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <IncomeChartStatistic :data="props.incomeValue" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import ExpenseChartStatistic from "@/components/Expenses/ExpenseChartStatistic.vue";
import IncomeChartStatistic from "@/components/Incomes/IncomeChartStatistic.vue";
import calculateTotal from "@/utils/calculateTotal";
import commaSeparator from "@/utils/commaSeparator";
import { computed } from "vue";

const props = defineProps(["expenseValue", "incomeValue", "loading"]);

const total = computed(() => {
  return calculateTotal(props.incomeValue) - calculateTotal(props.expenseValue);
});
</script>

<style scoped></style>
