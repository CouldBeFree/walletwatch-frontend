import { expensesStore } from "@/store/expenses";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import proxy from "@/utils/proxy";
import { FIRE_SNACK } from "@/constants";
import getErrorMessage from "@/utils/getErrorMessage";

export default function useTransactionExpenses() {
  const store = expensesStore();
  const { getUsersTransactions } = storeToRefs(store);

  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    await store.getUserTransactions();
    loading.value = false;
  });

  const onUpdate = async (val) => {
    loading.value = true;
    try {
      await store.updateUserTransaction(val);
      await store.getUserTransactions();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  };

  const onCreate = async (val) => {
    loading.value = true;
    try {
      await store.createUserTransaction(val);
      await store.getUserTransactions();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  };

  const onDelete = async (id) => {
    loading.value = true;
    try {
      await store.deleteUserTransaction(id);
      await store.getUserTransactions();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  };

  return { getUsersTransactions, onUpdate, onCreate, onDelete };
}
