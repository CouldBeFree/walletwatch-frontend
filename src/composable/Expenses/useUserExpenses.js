import { onMounted, ref } from "vue";
import { expensesStore } from "@/store/expenses";
import { storeToRefs } from "pinia";
import proxy from "@/utils/proxy";
import { FIRE_SNACK } from "@/constants";
import getErrorMessage from "@/utils/getErrorMessage";

export default function useUserExpenses() {
  const store = expensesStore();
  const { getUsersExpenses, getAllExpenses } = storeToRefs(store);

  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    await store.getUsersExpensesFromApi();
    await store.getAllExpensesFromApi();
    loading.value = false;
  });

  const onDeleteExpense = async (id) => {
    loading.value = true;
    try {
      await store.removeCategoryExpense(id);
      await store.getUsersExpensesFromApi();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
    } finally {
      loading.value = false;
    }
  };

  const onCreateExpense = async (ids) => {
    const promises = ids.map((id) => store.createExpense(id));
    loading.value = true;
    try {
      await Promise.all(promises);
      await store.getUsersExpensesFromApi();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
    } finally {
      loading.value = false;
    }
  };

  return {
    getUsersExpenses,
    getAllExpenses,
    onCreateExpense,
    onDeleteExpense,
    loading,
  };
}
