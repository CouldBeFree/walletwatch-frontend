<template>
  <v-row>
    <v-col xs="12" sm="12" md="7" lg="6">
      <v-card>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="one">Expenses</v-tab>
          <v-tab value="two">Incomes</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <UserExpenses
                :data="getAllExpenses"
                :userData="getUsersExpenses"
                :loading="expenseLoading"
                @delete="onDeleteExpense"
                @create="onCreateExpense"
              />
            </v-window-item>

            <v-window-item value="two">
              <UserIncomes
                :data="getAllIncomes"
                :userData="getUsersIncomes"
                :loading="loading"
                @delete="onDeleteIncomes"
                @create="onCreateIncome"
              />
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import useUserExpenses from "@/composable/Expenses/useUserExpenses";
import UserExpenses from "@/components/Expenses/UserExpenses.vue";
import useUserIncomes from "@/composable/Incomes/useUserIncomes";
import UserIncomes from "@/components/Incomes/UserIncomes.vue";

const {
  getAllExpenses,
  getUsersExpenses,
  loading: expenseLoading,
  onDeleteExpense,
  onCreateExpense,
} = useUserExpenses();

const {
  loading,
  getUsersIncomes,
  getAllIncomes,
  onDeleteIncomes,
  onCreateIncome,
} = useUserIncomes();

const tab = ref(null);
</script>

<style scoped></style>
