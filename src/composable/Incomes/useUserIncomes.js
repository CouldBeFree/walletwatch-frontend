import { onMounted, ref } from "vue";
import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import proxy from "@/utils/proxy";
import { FIRE_SNACK } from "@/constants";
import getErrorMessage from "@/utils/getErrorMessage";
import useDateSelector from "@/composable/useDateSelector";

export default function useUserIncomes() {
  const store = incomesStore();
  const { getUsersIncomes, getAllIncomes, getIncomeCategories } =
    storeToRefs(store);
  const { getAllIncomesFromApi, getIncomesCategoriesFromApi } = store;
  const { getDate } = useDateSelector();

  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    await getIncomesCategoriesFromApi();
    await getAllIncomesFromApi(getDate("month"));
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
    getAllIncomesFromApi,
    getIncomeCategories,
  };
}
