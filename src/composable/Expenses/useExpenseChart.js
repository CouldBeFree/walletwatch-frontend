import { expensesStore } from "@/store/expenses";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import useDateSelector from "@/composable/useDateSelector";

export default function useExpenseChart() {
  const { getDate } = useDateSelector();
  const store = expensesStore();
  const { getStatistic } = storeToRefs(store);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    await store.getUsersStatistic(getDate("month"));
    loading.value = false;
  });

  const getData = async (date) => {
    loading.value = true;
    await store.getUsersStatistic(date);
    loading.value = false;
  };

  return { getStatistic, getData };
}
