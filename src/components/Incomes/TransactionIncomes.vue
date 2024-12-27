<template>
  <v-data-table :items="transformedData" :headers="headers" :loading="loading">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Дохід</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="addIncome" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              Створити дохід
            </v-btn>
          </template>
          <v-card>
            <v-card-title>{{ income._id ? "Редагувати" : "Створити" }}</v-card-title>
            <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
              <v-card-item>
                <v-text-field
                  v-model="income.amount"
                  :rules="amountValidation"
                  required
                  label="Сума"
                  type="number"
                  prefix="₴"
                />
                <v-text-field
                  v-model="income.date"
                  type="date"
                  :rules="[(v) => !!v || 'Введіть дату']"
                  required
                />
                <v-select
                  label="Дохід"
                  v-model="income.income_category"
                  :items="props.categories || []"
                  item-value="_id"
                  item-title="name"
                  :rules="[(v) => !!v || 'Введіть дохід']"
                  :placeholder="'Виберіть дохід'"
                  :persistent-placeholder="'Оберіть дохід'"
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
                    {{ income._id ? "Редагувати" : "Створити" }}
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
            <v-card-title class="text-h5">Видалити {{ income?.income_category?.name }}?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="flat" @click="closeDelete"
              >Відмінити
              </v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="flat"
                @click="deleteItemConfirm"
                :loading="loading"
              >Видалити
              </v-btn
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
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script setup>
import moment from "moment";
import {ref, reactive, watch, computed} from "vue";
import {amountRules} from "@/settings/validationRules";
import useFormStatusHandler from "@/composable/useFormStatusHandler";
import commaSeparator from "@/utils/commaSeparator";

const props = defineProps(["data", "userData", "loading", "categories"]);
const emit = defineEmits(["delete", "create", "update"]);

const transformedData = computed(() => {
  return props.data?.map((el) => {
    return {
      ...el,
      date: moment(el.date).format("YYYY-MM-DD"),
      amount: commaSeparator(el.amount),
    };
  });
});

const initialIncomeState = {
  _id: null,
  amount: null,
  date: null,
  income_category: null
};

const {valid} = useFormStatusHandler();

const amountValidation = ref(amountRules);
const addIncome = ref(false);
const dialogDelete = ref(false);
const income = reactive({...initialIncomeState});
const headers = [
  {title: "Назва доходу", value: "income_category.name", sortable: true},
  {title: "Сума", value: "amount", sortable: true},
  {title: "Дата", value: "date", sortable: true},
  {title: "Дія", key: "actions", sortable: false},
];

watch(addIncome, (val) => {
  if (!val) {
    Object.assign(income, {...initialIncomeState});
  }
});

watch(dialogDelete, (val) => {
  if (!val) {
    Object.assign(income, {...initialIncomeState});
  }
});

const editItem = (item) => {
  const copyValue = JSON.parse(JSON.stringify(item));
  Object.assign(income, {
    ...copyValue,
    amount: +copyValue.amount.replace(',', ''),
    income_category: copyValue.income_category._id
  });
  addIncome.value = true;
};

const closeDelete = () => {
  dialogDelete.value = false;
};

const deleteItemConfirm = async () => {
  emit("delete", income._id);
  dialogDelete.value = false;
};

const deleteItem = (item) => {
  dialogDelete.value = true;
  Object.assign(income, {...item});
};

const onSubmit = async () => {
  if (!valid.value) return;
  income._id
    ? emit("update", {
      ...income,
      income_category: income.income_category,
      id: income._id,
      amount: +income.amount
    })
    : emit("create", {amount: +income.amount, date: income.date, income_category: income.income_category});
  Object.assign(income, {...initialIncomeState});
  addIncome.value = false;
};
</script>

<style scoped></style>
