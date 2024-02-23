<template>
  <v-card
    prepend-icon="mdi-cash-multiple"
    title="My expenses"
  >
    <template v-if="userExpensesLoading">
      <v-skeleton-loader
        class="mx-auto border"
        type="heading, divider, list-item-three-line, divider, list-item-three-line, divider, button"
      ></v-skeleton-loader>
    </template>
    <template v-if="isUsersExpenses && !userExpensesLoading">
      <v-table>
        <thead>
        <tr>
          <th class="text-left">
            Expense name
          </th>
          <th class="text-right">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
          <tr
            v-for="expense in userExpenses.data"
            :key="expense.id"
          >
            <td>{{ expense.expenses_category_name }}</td>
            <td class="text-right">
              <v-btn icon="mdi-delete" @click="onSelectItem(expense)" color="red" size="x-small"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>

    <template v-if="!isUsersExpenses && !userExpensesLoading" v-slot:text>
      You have not expenses yet
    </template>

    <v-card-actions class="pt-0" v-if="remainingExpenses.length">
      <v-btn
        variant="flat"
        color="primary"
        @click="onOpenModal"
      >
        Add Expenses
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog
    v-model="dialog"
    scrollable
    width="400"
    max-width="600"
  >
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
              <v-checkbox-btn :model-value="isActive" v-model="selected.selectedExpenses" :value="expense"></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title>{{ expense.expenses_category_name }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="onCancelExpense"
          variant="flat"
          color="primary"
        >
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
  <v-dialog
    v-model="removeDialog"
    scrollable
    width="400"
    max-width="600"
  >
    <v-card>
      <v-card-title class="text-h5">
        Remove {{selectedExpense.val?.expenses_category_name}} expense?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          variant="flat"
          color="primary"
          @click="onCancel"
        >
          Cancel
        </v-btn>
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
  <v-snackbar
    v-model="snackState.isOpen"
    :timeout="4000"
    :color="snackState.type"
  >
    {{snackState.text}}
  </v-snackbar>
</template>

<script setup>
  import {computed, ref} from "vue";
  import {onMounted, reactive} from "vue";
  import ExpenseService from "@/service/apiService/ExpenseService";
  import useSnackBar from "@/composable/useSnackBar";
  import getErrorMessage from "@/utils/getErrorMessage";

  const { snackState, openSnackBar } = useSnackBar();

  let allExpenses = reactive([]);
  const userExpenses = reactive({data: []});
  const selected = reactive({selectedExpenses: []});
  const selectedExpense = reactive({ val: null });
  const loading = ref(false);
  const dialog = ref(false);
  const removeDialog = ref(false);
  const userExpensesLoading = ref(false);

  let selectedIds = computed(() => selected.selectedExpenses.map(i => i.id));
  const isUsersExpenses = computed(() => userExpenses?.data.length);
  const remainingExpenses = computed(() => {
    const userExpenseNames = userExpenses.data.map(expense => expense.expenses_category_name);
    return allExpenses.filter(expense => !userExpenseNames.includes(expense.expenses_category_name));
  })

  const onCancelExpense = () => {
    dialog.value = false
    Object.assign(selected, { selectedExpenses: [] });
  }

  const onRemove = async () => {
    try {
      loading.value = true;
      await ExpenseService.removeExpense(selectedExpense.val.id);
      await getUsersExpenses();
      openSnackBar('Success', 'green');
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      openSnackBar(errorMsg, 'red');
    } finally {
      loading.value = false;
      removeDialog.value = false;
    }
  }

  const onSelectItem = (expense) => {
    removeDialog.value = true;
    Object.assign(selectedExpense, { val: expense });
  }

  const onCancel = () => {
    removeDialog.value = false;
    Object.assign(selectedExpense, { val: null });
  }

  const onSave = async () => {
    const promises = selectedIds.value.map(id => ExpenseService.addExpense({ expense_id: id }));
    try {
      loading.value = true;
      await Promise.all(promises);
      Object.assign(selected, { selectedExpenses: [] })
      openSnackBar('Success', 'green');
      await getUsersExpenses();
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      openSnackBar(errorMsg, 'red');
    } finally {
      dialog.value = false;
      loading.value = false;
    }
  }

  const getAllExpenses = async () => {
    const { data } = await ExpenseService.getAllExpenses();
    Object.assign(allExpenses, data);
  }

  const getUsersExpenses = async () => {
    userExpensesLoading.value = true;
    const { data } = await ExpenseService.getUserExpenses();
    Object.assign(userExpenses, {data});
    userExpensesLoading.value = false;
  }

  onMounted(async () => {
    await getAllExpenses();
    await getUsersExpenses();
  })

  const onOpenModal = () => {
    dialog.value = true;
  }
</script>

<style scoped>

</style>
