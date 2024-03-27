import { expensesStore } from "@/store/expenses";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import useDateSelector from "@/composable/useDateSelector";

export default function useExpenseChart() {
  const { getDate } = useDateSelector();
  const store = expensesStore();
  const { getStatistic } = storeToRefs(store);

  onMounted(async () => {
    await store.getUsersStatistic(getDate("allTime"));
  });

  const getData = async (date) => {
    await store.getUsersStatistic(date);
  };

  return { getStatistic, getData };
}
