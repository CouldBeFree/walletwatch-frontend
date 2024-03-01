<template>
  <h1>Expenses</h1>
  <v-row align="start">
    <v-col xs="12" sm="12" md="5" lg="3">
      <UserExpenses
        :data="getAllExpenses"
        :userData="expensesFromStore"
        :loading="loading"
        @delete="onDeleteExpense"
        @create="onCreateExpense"
      />
    </v-col>
    <v-col xs="12" sm="12" md="7" lg="5">
      <TransactionExpenses />
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4">
      <ExpenseChartStatistic />
    </v-col>
  </v-row>
</template>

<script setup>
import ExpenseChartStatistic from "@/components/ExpenseChartStatistic.vue";
import UserExpenses from "@/components/UserExpenses.vue";
import TransactionExpenses from "@/components/TransactionExpenses.vue";
import { storeToRefs } from "pinia";
import { expensesStore } from "@/store/expenses";
import {onMounted, ref} from "vue";
import getErrorMessage from "@/utils/getErrorMessage";
import proxy from "@/utils/proxy";
import { FIRE_SNACK } from "@/constants";

const store = expensesStore();
const { getUsersExpenses: expensesFromStore, getAllExpenses } = storeToRefs(store);

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await store.getUsersExpensesFromApi();
  await store.getAllExpensesFromApi();
  loading.value = false;
});

const onDeleteExpense = async (id) => {
  loading.value = true;
  try {
    await store.removeCategoryExpense(id);
    await store.getUsersExpensesFromApi();
    proxy.publish(FIRE_SNACK, { type: 'green', text: 'Success' });
  } catch (e) {
    const errorMsg = getErrorMessage(e);
    proxy.publish(FIRE_SNACK, { type: 'red', text: errorMsg });
  } finally {
    loading.value = false;
  }
}

const onCreateExpense = async (ids) => {
  const promises = ids.map((id) => store.createExpense(id));
  loading.value = true;
  try {
    await Promise.all(promises);
    await store.getUsersExpensesFromApi();
    proxy.publish(FIRE_SNACK, { type: 'green', text: 'Success' });
  } catch (e) {
    const errorMsg = getErrorMessage(e);
    proxy.publish(FIRE_SNACK, { type: 'red', text: errorMsg });
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
