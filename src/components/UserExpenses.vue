<template>
  <v-card
    width="400"
    prepend-icon="mdi-cash-multiple"
    title="My expenses"
  >
    <template v-if="isUsersExpenses">
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
            <v-btn icon="mdi-delete" @click="onSelectItem(expense.id)" color="red" size="x-small"></v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </template>

    <template v-if="!isUsersExpenses" v-slot:text>
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
          @click="dialog = false"
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
        Use Google's location service?
      </v-card-title>
      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
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
</template>

<script setup>
  import {computed, ref} from "vue";
  import {onMounted, reactive} from "vue";
  import ExpenseService from "@/service/apiService/ExpenseService";

  let allExpenses = reactive([]);
  let userExpenses = reactive({data: []});
  let selected = reactive({selectedExpenses: []});
  const loading = ref(false);
  const dialog = ref(false);
  const removeDialog = ref(false);
  const selectedId = ref(null);

  let selectedIds = computed(() => selected.selectedExpenses.map(i => i.id));
  const isUsersExpenses = computed(() => userExpenses?.data.length);
  const remainingExpenses = computed(() => {
    const userExpenseNames = userExpenses.data.map(expense => expense.expenses_category_name);
    return allExpenses.filter(expense => !userExpenseNames.includes(expense.expenses_category_name));
  })

  const onRemove = async () => {
    try {
      loading.value = true;
      await ExpenseService.removeExpense(selectedId.value)
      await getUsersExpenses();
      removeDialog.value = false;
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  const onSelectItem = (id) => {
    removeDialog.value = true;
    selectedId.value = id;
  }

  const onCancel = () => {
    removeDialog.value = false;
    selectedId.value = null;
  }

  const onSave = async () => {
    const promises = selectedIds.value.map(id => ExpenseService.addExpense({ expense_id: id }));
    try {
      loading.value = true;
      await Promise.all(promises);
      // selected.selectedExpenses = [];
      Object.assign(selected, { selectedExpenses: [] })
      dialog.value = false;
      await getUsersExpenses();
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  const getAllExpenses = async () => {
    const { data } = await ExpenseService.getAllExpenses();
    Object.assign(allExpenses, data)
  }

  const getUsersExpenses = async () => {
    const { data } = await ExpenseService.getUserExpenses();
    Object.assign(userExpenses, {data});
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
