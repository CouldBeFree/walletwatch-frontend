<template>
  <v-row align="start">
    <v-col xs="12" sm="7" md="7" lg="7">
      <div class="mb-6">
        <DateSelector @selectDate="onDateSelect" />
      </div>
      <TransactionIncomes
        :data="getUsersTransactions"
        :userData="getUsersIncomes"
        :loading="transactionIncomesLoading"
        @update="onUpdateUserIncome"
        @create="onCreateUsersIncome"
        @delete="onDeleteUserIncomes"
      />
    </v-col>
    <v-col xs="12" sm="5" md="5" lg="5">
      <IncomeChartStatistic :data="getStatistic" />
    </v-col>
  </v-row>
</template>

<script setup>
import TransactionIncomes from "@/components/Incomes/TransactionIncomes.vue";
import IncomeChartStatistic from "@/components/Incomes/IncomeChartStatistic.vue";
import useUserIncomes from "@/composable/Incomes/useUserIncomes";
import useTransactionIncomes from "@/composable/Incomes/useTransactionIncomes";
import useIncomeChart from "@/composable/Incomes/useIncomeChart";
import DateSelector from "@/components/DateSelector/DateSelector.vue";
import { onMounted, reactive } from "vue";
import useDateSelector from "@/composable/useDateSelector";

const { getUsersIncomes } = useUserIncomes();

const {
  getUsersTransactions,
  loading: transactionIncomesLoading,
  onUpdate,
  onCreate,
  onDelete,
  onUpdateUserIncomes,
} = useTransactionIncomes();

const { getData, getStatistic } = useIncomeChart();
const { getDate } = useDateSelector();

const selectedDate = reactive(getDate("month"));

onMounted(() => {
  onUpdateUserIncomes(selectedDate);
});

const onDateSelect = async (value) => {
  Object.assign(selectedDate, { ...value });
  await onUpdateUserIncomes(value);
  await getData(value);
};

const onUpdateUserIncome = (value) => {
  onUpdate(value).then(() => {
    onUpdateUserIncomes(selectedDate);
    getData(selectedDate);
  });
};

const onCreateUsersIncome = (value) => {
  onCreate(value).then(() => {
    onUpdateUserIncomes(selectedDate);
    getData(selectedDate);
  });
};

const onDeleteUserIncomes = (id) => {
  onDelete(id).then(() => {
    onUpdateUserIncomes(selectedDate);
    getData(selectedDate);
  });
};
</script>

<style scoped></style>
