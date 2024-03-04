import { onMounted, ref } from "vue";
import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import proxy from "@/utils/proxy";
import { FIRE_SNACK } from "@/constants";
import getErrorMessage from "@/utils/getErrorMessage";

export default function useUserIncomes() {
  const store = incomesStore();
  const { getUsersIncomes, getAllIncomes } = storeToRefs(store);

  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    await store.getUsersIncomesFromApi();
    await store.getAllIncomesFromApi();
    loading.value = false;
  });

  const onDeleteIncomes = async (id) => {
    loading.value = true;
    try {
      await store.removeCategoryIncome(id);
      await store.getUsersIncomesFromApi();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
    } finally {
      loading.value = false;
    }
  };

  const onCreateIncome = async (ids) => {
    const promises = ids.map((id) => store.createIncome(id));
    loading.value = true;
    try {
      await Promise.all(promises);
      await store.getUsersIncomesFromApi();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getUsersIncomes,
    getAllIncomes,
    onDeleteIncomes,
    onCreateIncome,
  };
}
