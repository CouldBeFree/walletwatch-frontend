<template>
  <v-card prepend-icon="mdi-cash-multiple" title="My expenses">
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
            <th class="text-left">Expense name</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userData" :key="item.id">
            <td>
              <v-icon
                :icon="getExpenseIcon(item.expenses_category_name)"
                size="large"
                start
              />
              {{ item.expenses_category_name }}
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

    <v-card-actions class="pt-0" v-if="remainingExpenses?.length">
      <v-btn variant="flat" color="primary" @click="onOpenModal">
        Add Expenses
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialog" scrollable width="400" max-width="600">
    <v-card>
      <v-card-title>Select Expenses</v-card-title>
      <v-divider></v-divider>
      <v-list select-strategy="classic">
        <v-list-subheader>General</v-list-subheader>
        <v-list-item
          v-for="expense in remainingExpenses"
          :key="expense.id"
          :value="expense.id"
        >
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn
                :model-value="isActive"
                v-model="selected.selectedExpenses"
                :value="expense"
              ></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title>{{
            expense.expenses_category_name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCancelExpense" variant="flat" color="primary">
          Close
        </v-btn>
        <v-btn
          @click="onSave"
          variant="flat"
          color="primary"
          :disabled="!selectedIds.length"
          :loading="loading"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="removeDialog" scrollable width="400" max-width="600">
    <v-card>
      <v-card-title class="text-h5">
        Remove {{ selectedExpense.val?.expenses_category_name }} expense?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" color="primary" @click="onCancel"> Cancel </v-btn>
        <v-btn
          variant="flat"
          color="primary"
          @click="onRemove"
          :loading="loading"
        >
          Remove
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { reactive } from "vue";
import getExpenseIcon from "@/utils/getExpenseIcon";

const props = defineProps(["data", "userData", "loading"]);
const emit = defineEmits(["delete", "create"]);

const selected = reactive({ selectedExpenses: [] });
const selectedExpense = reactive({ val: null });
const dialog = ref(false);
const removeDialog = ref(false);

let selectedIds = computed(() => selected.selectedExpenses.map((i) => i.id));
const remainingExpenses = computed(() => {
  const userExpenseNames = props.userData.map(
    (expense) => expense.expenses_category_name,
  );
  return props.data.filter(
    (expense) => !userExpenseNames.includes(expense.expenses_category_name),
  );
});

const onCancelExpense = () => {
  dialog.value = false;
  Object.assign(selected, { selectedExpenses: [] });
};

const onRemove = async () => {
  emit("delete", selectedExpense.val.id);
  removeDialog.value = false;
};

const onSelectItem = (expense) => {
  removeDialog.value = true;
  Object.assign(selectedExpense, { val: expense });
};

const onCancel = () => {
  removeDialog.value = false;
  Object.assign(selectedExpense, { val: null });
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
