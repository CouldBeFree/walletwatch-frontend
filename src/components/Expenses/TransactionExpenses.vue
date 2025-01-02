<template>
  <v-data-table :items="transformedData" :headers="headers" :loading="loading">
<!--    <template v-slot:item.expense_category.name="{ value }">-->
<!--      <a :href="`expense/${getId(value)}`">{{value}}</a>-->
<!--    </template>-->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Витрати</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="addExpense" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              Створити витрату
            </v-btn>
          </template>
          <v-card>
            <v-card-title>{{ expense._id ? "Редагувати" : "Створити" }}</v-card-title>
            <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
              <v-card-item>
                <v-text-field
                  v-model="expense.amount"
                  :rules="amountValidation"
                  required
                  label="Сума"
                  type="number"
                  prefix="₴"
                />
                <v-text-field
                  v-model="expense.date"
                  type="date"
                  :rules="[(v) => !!v || 'Введіть дату']"
                  required
                />
                <v-select
                  label="Витрати"
                  v-model="expense.expense_category"
                  :items="categories"
                  item-value="_id"
                  item-title="name"
                  :rules="[(v) => !!v || 'Введіть витрату']"
                  :placeholder="'Виберіть витрату'"
                  :persistent-placeholder="'Виберіть витрату'"
                ></v-select>
                <v-text-field
                  label="Коментар"
                  v-model="expense.comment"
                  type="text"
                  placeholder="Введіть коментар"
                />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="flat"
                    color="primary"
                    @click="addExpense = false"
                  >
                    Відмінити
                  </v-btn>
                  <v-btn
                    @click="onSubmit"
                    variant="flat"
                    color="primary"
                    type="submit"
                    :loading="loading"
                  >
                    {{ expense._id ? "Редагувати" : "Сворити" }}
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
              >Видалити {{ expense?.expense_category?.name }}?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="flat" @click="closeDelete"
                >Відмінити</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="flat"
                @click="deleteItemConfirm"
                :loading="loading"
                >Видалити</v-btn
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
import moment from "moment";
import { ref, reactive, watch, computed } from "vue";
import { amountRules } from "@/settings/validationRules";
import commaSeparator from "@/utils/commaSeparator";
import useFormStatusHandler from "@/composable/useFormStatusHandler";
import truncateText from "@/utils/truncateText";

const props = defineProps(["data", "loading", "categories"]);
const emit = defineEmits(["delete", "create", "update"]);

const transformedData = computed(() => {
  return props.data?.map((el) => {
    return {
      ...el,
      date: moment(el.date).format("YYYY-MM-DD"),
      amount: commaSeparator(el.amount),
      comment: truncateText(el.comment, 30) || '',
    };
  });
});

const initialExpenseState = {
  _id: null,
  amount: null,
  date: null,
  expense_category: null,
  comment: null,
};

const { valid } = useFormStatusHandler();

const amountValidation = ref(amountRules);
const addExpense = ref(false);
const dialogDelete = ref(false);
const expense = reactive({ ...initialExpenseState });
const headers = [
  { title: "Назва витрат", value: "expense_category.name", sortable: true },
  { title: "Сума", value: "amount", sortable: true },
  { title: "Дата", value: "date", sortable: true },
  { title: "Коментар", value: "comment", sortable: false },
  { title: "Дія", key: "actions", sortable: false },
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

// const getId = (name) => {
//   const category = transformedData.value.find(el => el.expense_category.name === name);
//   if (category) return category.expense_category._id;
//   return null;
// }

const editItem = (item) => {
  const copyValue = JSON.parse(JSON.stringify(item));
  Object.assign(expense, {
    ...copyValue,
    amount: +copyValue.amount.replace(',', ''),
    expense_category: copyValue.expense_category._id
  });
  addExpense.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const deleteItemConfirm = async () => {
  emit("delete", expense._id);
  dialogDelete.value = false;
};

const deleteItem = (item) => {
  dialogDelete.value = true;
  Object.assign(expense, { ...item });
};

const onSubmit = async () => {
  if (!valid.value) return;
  expense._id
    ? emit("update", {
        ...expense,
        expense_category: expense.expense_category,
        id: expense._id,
        amount: +expense.amount,
        comment: expense.comment
      })
    : emit("create", { amount: +expense.amount, date: expense.date, expense_category: expense.expense_category, comment: expense.comment });
  Object.assign(expense, { ...initialExpenseState });
  addExpense.value = false;
};
</script>

<style scoped></style>
