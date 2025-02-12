import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import proxy from "@/utils/proxy";
import { FIRE_SNACK } from "@/constants";
import getErrorMessage from "@/utils/getErrorMessage";

export default function useTransactionIncomes() {
  const store = incomesStore();
  const { getAllIncomes } = storeToRefs(store);

  const loading = ref(false);

  const onUpdate = async (val) => {
    loading.value = true;
    try {
      await store.updateUserTransaction(val);
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
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
      throw new Error(e);
    } finally {
      loading.value = false;
    }
  };

  const onUpdateUserIncomes = async (date) => {
    loading.value = true;
    // await store.getUserIncomes(date);
    loading.value = false;
  };

  return {
    loading,
    getAllIncomes,
    onUpdate,
    onCreate,
    onDelete,
    onUpdateUserIncomes,
  };
}
