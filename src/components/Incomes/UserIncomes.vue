<template>
  <v-card prepend-icon="mdi-cash-multiple" title="My incomes">
    <template v-if="loading">
      <v-skeleton-loader
        class="mx-auto border"
        type="heading, divider, list-item-three-line, divider, list-item-three-line, divider, button"
      ></v-skeleton-loader>
    </template>
    <template v-slot:text v-if="userData?.length">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Назва доходу</th>
            <th class="text-right">Дія</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userData" :key="item.id">
            <td>
              <v-icon
                :icon="getIncomeIcon(item.incomes_category_name)"
              ></v-icon>
              {{ item.incomes_category_name }}
            </td>
            <td class="text-right">
              <v-btn
                icon="mdi-delete"
                @click="onSelectItem(item)"
                color="red"
                size="x-small"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>

    <v-card-actions class="pt-0" v-if="remainingIncomes?.length">
      <v-btn variant="flat" color="primary" @click="onOpenModal">
        Add Income
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialog" scrollable width="400" max-width="600">
    <v-card>
      <v-card-title>Select Income</v-card-title>
      <v-divider></v-divider>
      <v-list select-strategy="classic">
        <v-list-subheader>General</v-list-subheader>
        <v-list-item
          v-for="income in remainingIncomes"
          :key="income.id"
          :value="income.id"
        >
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn
                :model-value="isActive"
                v-model="selected.selectedIncomes"
                :value="income"
              ></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title>{{
            income.incomes_category_name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="userIncomeClose" variant="flat" color="primary">
          Закрити
        </v-btn>
        <v-btn
          @click="onSave"
          variant="flat"
          color="primary"
          :disabled="!selectedIds.length"
          :loading="loading"
        >
          Зберегти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="removeDialog" scrollable width="400" max-width="600">
    <v-card>
      <v-card-title class="text-h5">
        Видалити {{ selectedIncome.val?.incomes_category_name }} дохід?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="primary" @click="onCancel">
          Відмінити
        </v-btn>
        <v-btn
          variant="flat"
          color="primary"
          @click="onRemove"
          :loading="loading"
        >
          Видалити
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { reactive } from "vue";
import getIncomeIcon from "@/utils/getIncomeIcon";

const props = defineProps(["data", "userData", "loading"]);
const emit = defineEmits(["delete", "create"]);

const selected = reactive({ selectedIncomes: [] });
const selectedIncome = reactive({ val: null });
const dialog = ref(false);
const removeDialog = ref(false);

let selectedIds = computed(() => selected.selectedIncomes.map((i) => i.id));
const remainingIncomes = computed(() => {
  const userIncomeNames = props.userData.map(
    (income) => income.incomes_category_name,
  );
  return props.data.filter(
    (income) => !userIncomeNames.includes(income.incomes_category_name),
  );
});

const userIncomeClose = () => {
  dialog.value = false;
  Object.assign(selected, { selectedIncomes: [] });
};

const onRemove = async () => {
  emit("delete", selectedIncome.val.id);
  removeDialog.value = false;
};

const onSelectItem = (income) => {
  removeDialog.value = true;
  Object.assign(selectedIncome, { val: income });
};

const onCancel = () => {
  removeDialog.value = false;
  Object.assign(selectedIncome, { val: null });
};

const onSave = async () => {
  emit("create", selectedIds.value);
  dialog.value = false;
};

const onOpenModal = () => {
  dialog.value = true;
};
</script>

<style scoped></style>
