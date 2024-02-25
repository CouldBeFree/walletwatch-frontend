<template>
  <v-data-table
    :items="userExpenses.value"
    :headers="headers"
    :loading="isLoadingExpenses"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Transaction Expenses</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="addExpense"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="props"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Add transaction</v-card-title>
            <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
              <v-card-item>
                <v-text-field
                  v-model="expense.amount"
                  :rules="amountValidation"
                  required
                  label="Amount"
                  type="number"
                  prefix="₴"
                />
                <v-text-field
                  v-model="expense.date"
                  type="date"
                  :rules="[(v) => !!v || 'Date is required']"
                  required
                />
                <v-select
                  label="Select"
                  v-model="expense.expense_category_id"
                  :items="getUsersExpenses"
                  item-value="id"
                  item-title="expenses_category_name"
                  :rules="[(v) => !!v || 'Expense is required']"
                  :placeholder="'Select expense'"
                  :persistent-placeholder="'Select expense'"
                ></v-select>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="flat"
                    color="primary"
                    @click="addExpense = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    @click="onSubmit"
                    variant="flat"
                    color="primary"
                    type="submit"
                    :loading="loading"
                  >
                    {{ expense.id ? 'Edit' : 'Create' }}
                  </v-btn>
                </v-card-actions>
              </v-card-item>
            </v-form>
          </v-card>
        </v-dialog>
        <!--        -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  <v-snackbar
    v-model="snackState.isOpen"
    :timeout="4000"
    :color="snackState.type"
  >
    {{snackState.text}}
  </v-snackbar>
</template>

<script setup>
  import {ref, reactive, watch, onMounted} from "vue";
  import { amountRules } from '@/settings/validationRules';
  import { expensesStore } from "@/store/expenses";
  import {storeToRefs} from "pinia";
  import useFormStatusHandler from "@/composable/useFormStatusHandler";
  import ExpenseService from "@/service/apiService/ExpenseService";
  import useSnackBar from "@/composable/useSnackBar";
  import getErrorMessage from "@/utils/getErrorMessage";

  const initialExpenseState = {
    amount: null,
    date: null,
    expense_category_id: null,
    expense_category_name: null
  }

  const store = expensesStore();

  const { snackState, openSnackBar } = useSnackBar();
  const { getUsersExpenses } = storeToRefs(store);
  const { valid, loading } = useFormStatusHandler();

  const amountValidation = ref(amountRules);
  const addExpense = ref(false);
  const isLoadingExpenses = ref(false);
  const dialogDelete = ref(false);
  const formTitle = ref('');
  const selectedDate = ref('');
  const formattedDate = ref('');
  const expense = reactive({ ...initialExpenseState });
  const userExpenses = reactive({ value: [] });
  const headers = [
    { title: 'Expense name', value: 'expenses_category_name', sortable: true },
    { title: 'Amount', value: 'amount', sortable: true },
    { title: 'Date', value: 'date', sortable: true},
    { title: 'Actions', key: 'actions', sortable: false }
  ]

  watch(addExpense, (val) => {
    if (!val) {
      Object.assign(expense, { ...initialExpenseState })
    }
  });

  const editItem = (item) => {
    const id = getUsersExpenses.value.find((el) => el.expenses_category_name === item.expenses_category_name)?.id;
    Object.assign(expense, { ...item, expense_category_id: id });
    addExpense.value = true;
  }
  const closeDelete = (item) => console.log(item);
  const deleteItemConfirm = (item) => console.log(item);
  const deleteItem = (item) => console.log(item);
  const close = (item) => console.log(item);
  const save = (item) => console.log(item);

  const onSubmit = async () => {
    if (!valid.value) return;
    loading.value = true;
    try {
      await ExpenseService.createExpense(expense);
      await getAllCreatedExpenses();
      openSnackBar('Success', 'green');
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      openSnackBar(errorMsg, 'red');
    } finally {
      addExpense.value = false;
      loading.value = false;
    }
  }

  const getAllCreatedExpenses = async () => {
    isLoadingExpenses.value = true;
    const { data } = await ExpenseService.getAllCreatedExpenses();
    Object.assign(userExpenses, { value: data })
    isLoadingExpenses.value = false;
    console.log(data);
  }

  onMounted(async () => {
    await getAllCreatedExpenses();
  });
</script>

<style scoped>

</style>
