<template>
  <v-row>
    <v-col cols="12" offset-lg="3" lg="6">
      <div class="mb-6 text-center">
        <DateSelector @selectDate="onDateSelect" />
      </div>
      <TotalStatistic :date="selectedDate" />
    </v-col>
<!--    <v-col lg="5">-->
<!--      <TransactionHistory />-->
<!--    </v-col>-->
  </v-row>
</template>

<script setup>
import { reactive } from "vue";
import TotalStatistic from "@/components/TotalStatistic/TotalStatistic.vue";
import DateSelector from "@/components/DateSelector/DateSelector.vue";
// import TransactionHistory from "@/components/TransactionHistory/TransactionHistory.vue";

const selectedDate = reactive({});

const onDateSelect = (date) => {
  Object.assign(selectedDate, { ...date });
};
</script>
