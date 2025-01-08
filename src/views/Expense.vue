<template>
  <h1 class="mb-4">{{getExpense.expense}}</h1>
  <v-btn @click="dialogCreate = true" class="mb-4" color="primary" size="large" icon="mdi-plus"></v-btn>
  <v-row>
    <v-col cols="12" xs="12" sm="12" md="2" lg="2" v-for="cat in getAllSubCategories">
      <v-card
        :key="cat._id"
        class="mx-auto"
        :prepend-icon="cat.expense_category_icon"
        :title="cat.name"
      >
        <v-card-actions>
          <v-btn prepend-icon="mdi-pencil" text="Редагувати" @click="onEditItem(cat)"></v-btn>
          <v-btn prepend-icon="mdi-delete-forever" text="Видалити"></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog
    v-model="dialogCreate"
    scrollable
    max-width="500px"
    width="400"
  >
    <v-card>
      <v-card-title>Створити категорію для {{getExpense.expense}}</v-card-title>
      <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
        <v-card-item>
          <v-text-field
            :rules="nameRules"
            label="Ім'я"
            v-model="expenseItem.name"
            type="text"
            placeholder="Введіть ім'я"
            required
          />
          <v-text-field
            label="Іконка"
            v-model="expenseItem.expense_category_icon"
            type="text"
            placeholder="mdi-delete-forever"
            :append-icon="expenseItem.expense_category_icon || 'mdi-material-ui'"
          />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="flat"
              color="primary"
              @click="dialogCreate = false"
            >
              Відмінити
            </v-btn>
            <v-btn
              @click="onSubmit"
              variant="flat"
              color="primary"
              type="submit"
              :loading="subCategoryLoading"
            >
              {{expenseItem._id ? "Редагувати" : "Створити"}}
            </v-btn>
          </v-card-actions>
        </v-card-item>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {expensesStore} from "@/store/expenses";
import {subCategories} from "@/store/subCategories";
import {useRoute} from 'vue-router'
import {onMounted, reactive, ref, toRaw, watch} from "vue";
import {storeToRefs} from "pinia";
import useFormStatusHandler from "@/composable/useFormStatusHandler";
import {nameRules} from "@/settings/validationRules";
import proxy from "@/utils/proxy";
import {FIRE_SNACK} from "@/constants";


const {valid} = useFormStatusHandler();
const dialogCreate = ref(false);
const route = useRoute();
const expense = expensesStore();
const subCategory = subCategories();
const { getExpense, loading } = storeToRefs(expense);
const { getLoading: subCategoryLoading, getAllSubCategories } = storeToRefs(subCategory);
const {
  getExpenseItem
} = expense;
const initialCategoryState = {
  _id: null,
  name: null,
  expense_category_icon: null,
};

let expenseItem = reactive({...initialCategoryState});

const {
  getSubCategories,
  createSubCategory,
  updateSubCategory
} = subCategory;

onMounted(async () => {
  await getExpenseItem(route.params.id);
  await getSubCategories(route.params.id);
});

watch(dialogCreate, (newVal) => {
  if (!newVal) Object.assign(expenseItem, {  ...initialCategoryState })
});

const onEditItem = (item) => {
  Object.assign(expenseItem, {  ...item });
  dialogCreate.value = true;
};

const onSubmit = () => {
  if (!valid.value) return;
  const fnc = expenseItem._id ? updateSubCategory : createSubCategory;
  fnc({
    ...expenseItem,
    expense_category: route.params.id
  })
    .then(() => {
      getSubCategories(route.params.id);
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
      dialogCreate.value = false;
    })
    .catch((e) => {
      proxy.publish(FIRE_SNACK, { type: "red", text: e });
    })
}
</script>

<style scoped>

</style>
