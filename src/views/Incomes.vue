<template>
  <h1>Incomes</h1>
  <v-row align="start">
    <v-col xs="12" sm="7" md="7" lg="7">
      <TransactionIncomes
        :data="getUsersTransactions"
        :userData="getUsersIncomes"
        :loading="transactionIncomesLoading"
        @update="onUpdateUserIncome"
        @create="onCreateUsersIncome"
        @delete="onDeleteuserIncomes"
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

const { getUsersIncomes } = useUserIncomes();

const {
  getUsersTransactions,
  loading: transactionIncomesLoading,
  onUpdate,
  onCreate,
  onDelete,
} = useTransactionIncomes();

const { getData, getStatistic } = useIncomeChart();

const onUpdateUserIncome = (value) => {
  onUpdate(value).then(() => getData());
};

const onCreateUsersIncome = (value) => {
  onCreate(value).then(() => getData());
};

const onDeleteuserIncomes = (id) => {
  onDelete(id).then(() => getData());
};
</script>

<style scoped></style>
