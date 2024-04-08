<template>
  <v-data-table :items="transformedData" :headers="headers" :loading="loading">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Transaction Expenses</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="addExpense" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>{{ expense.id ? "Edit" : "Create" }}</v-card-title>
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
                    {{ expense.id ? "Edit" : "Create" }}
                  </v-btn>
                </v-card-actions>
              </v-card-item>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogDelete"
          scrollable
          max-width="500px"
          width="400"
        >
          <v-card>
            <v-card-title class="text-h5"
              >Remove {{ expense.expenses_category_name }}?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="flat" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="flat"
                @click="deleteItemConfirm"
                :loading="loading"
                >Remove</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { amountRules } from "@/settings/validationRules";
import { expensesStore } from "@/store/expenses";
import { storeToRefs } from "pinia";
import commaSeparator from "@/utils/commaSeparator";
import useFormStatusHandler from "@/composable/useFormStatusHandler";

const props = defineProps(["data", "userData", "loading"]);
const emit = defineEmits(["delete", "create", "update"]);

const transformedData = computed(() => {
  return props.data?.map((el) => {
    return {
      ...el,
      amount: commaSeparator(el.amount),
    };
  });
});

const initialExpenseState = {
  id: null,
  amount: null,
  date: null,
  expense_category_id: null,
  expense_category_name: null,
};

const store = expensesStore();

const { getUsersExpenses } = storeToRefs(store);
const { valid } = useFormStatusHandler();

const amountValidation = ref(amountRules);
const addExpense = ref(false);
const dialogDelete = ref(false);
const expense = reactive({ ...initialExpenseState });
const headers = [
  { title: "Expense name", value: "expenses_category_name", sortable: true },
  { title: "Amount", value: "amount", sortable: true },
  { title: "Date", value: "date", sortable: true },
  { title: "Actions", key: "actions", sortable: false },
];

watch(addExpense, (val) => {
  if (!val) {
    Object.assign(expense, { ...initialExpenseState });
  }
});

watch(dialogDelete, (val) => {
  if (!val) {
    Object.assign(expense, { ...initialExpenseState });
  }
});

const editItem = (item) => {
  const id = props.userData.find(
    (el) => el.expenses_category_name === item.expenses_category_name,
  )?.id;
  Object.assign(expense, { ...item, expense_category_id: id });
  addExpense.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const deleteItemConfirm = async () => {
  emit("delete", expense.id);
  dialogDelete.value = false;
};

const deleteItem = (item) => {
  dialogDelete.value = true;
  Object.assign(expense, { ...item });
};

const editedCategoryName = computed(() => {
  return props.userData.find((el) => el.id === expense.expense_category_id)
    ?.expenses_category_name;
});

const onSubmit = async () => {
  if (!valid.value) return;
  expense.id
    ? emit("update", {
        ...expense,
        expenses_category_name: editedCategoryName.value,
        id: expense.id,
      })
    : emit("create", expense);
  Object.assign(expense, { ...initialExpenseState });
  addExpense.value = false;
};
</script>

<style scoped></style>
