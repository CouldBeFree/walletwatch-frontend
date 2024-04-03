<template>
  <v-data-table :items="transformedData" :headers="headers" :loading="loading">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Transaction Incomes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="addIncome" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>{{ income.id ? "Edit" : "Create" }}</v-card-title>
            <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
              <v-card-item>
                <v-text-field
                  v-model="income.amount"
                  :rules="amountValidation"
                  required
                  label="Amount"
                  type="number"
                  prefix="₴"
                />
                <v-text-field
                  v-model="income.date"
                  type="date"
                  :rules="[(v) => !!v || 'Date is required']"
                  required
                />
                <v-select
                  label="Select"
                  v-model="income.income_category_id"
                  :items="getUsersIncomes"
                  item-value="id"
                  item-title="incomes_category_name"
                  :rules="[(v) => !!v || 'Income is required']"
                  :placeholder="'Select income'"
                  :persistent-placeholder="'Select income'"
                ></v-select>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    variant="flat"
                    color="primary"
                    @click="addIncome = false"
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
                    {{ income.id ? "Edit" : "Create" }}
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
              >Remove {{ income.incomes_category_name }}?</v-card-title
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
import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import useFormStatusHandler from "@/composable/useFormStatusHandler";
import commaSeparator from "@/utils/commaSeparator";

const props = defineProps(["data", "userData", "loading"]);
const emit = defineEmits(["delete", "create", "update"]);

const transformedData = computed(() => {
  return props.data?.map(el => {
    return {
      ...el, amount: commaSeparator(el.amount)
    }
  })
});

const initialIncomeState = {
  id: null,
  amount: null,
  date: null,
  income_category_id: null,
  incomes_category_name: null,
};

const store = incomesStore();

const { getUsersIncomes } = storeToRefs(store);
const { valid } = useFormStatusHandler();

const amountValidation = ref(amountRules);
const addIncome = ref(false);
const dialogDelete = ref(false);
const income = reactive({ ...initialIncomeState });
const headers = [
  { title: "Income name", value: "incomes_category_name", sortable: true },
  { title: "Amount", value: "amount", sortable: true },
  { title: "Date", value: "date", sortable: true },
  { title: "Actions", key: "actions", sortable: false },
];

watch(addIncome, (val) => {
  if (!val) {
    Object.assign(income, { ...initialIncomeState });
  }
});

watch(dialogDelete, (val) => {
  if (!val) {
    Object.assign(income, { ...initialIncomeState });
  }
});

const editItem = (item) => {
  const id = props.userData.find(
    (el) => el.incomes_category_name === item.incomes_category_name,
  )?.id;
  Object.assign(income, { ...item, income_category_id: id });
  addIncome.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const deleteItemConfirm = async () => {
  emit("delete", income.id);
  dialogDelete.value = false;
};

const deleteItem = (item) => {
  dialogDelete.value = true;
  Object.assign(income, { ...item });
};

const editedCategoryName = computed(() => {
  return props.userData.find((el) => el.id === income.income_category_id)
    ?.incomes_category_name;
});

const onSubmit = async () => {
  if (!valid.value) return;
  income.id
    ? emit("update", {
        ...income,
        incomes_category_name: editedCategoryName.value,
        id: income.id,
      })
    : emit("create", income);
  Object.assign(income, { ...initialIncomeState });
  addIncome.value = false;
};
</script>

<style scoped></style>
