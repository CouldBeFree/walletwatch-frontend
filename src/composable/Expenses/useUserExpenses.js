import { onMounted } from "vue";
import { expensesStore } from "@/store/expenses";
import { storeToRefs } from "pinia";
import proxy from "@/utils/proxy";
import { FIRE_SNACK } from "@/constants";
import getErrorMessage from "@/utils/getErrorMessage";

export default function useUserExpenses() {
  const store = expensesStore();
  const { getAllExpenses, getUserExpenseCategories, getLoading } = storeToRefs(store);
  const { getCategories, removeCategoryExpense, createUserTransaction, getUserTransactions, updateUserTransaction } = store;

  onMounted(async () => {
    await getCategories();
  });

  const onUpdateExpense = async (item) => {
    try {
      await updateUserTransaction(item);
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
      throw new Error(e);
    }
  }

  const onDeleteExpense = async (id) => {
    try {
      await removeCategoryExpense(id);
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
      throw new Error(e);
    }
  };

  const onCreateExpense = async (expense) => {
    try {
      await createUserTransaction(expense);
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
      throw new Error(e);
    }
  };

  return {
    getUserTransactions,
    onUpdateExpense,
    onCreateExpense,
    onDeleteExpense,
    getUserExpenseCategories,
    getAllExpenses,
    getLoading,
  };
}
