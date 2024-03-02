import { expensesStore } from "@/store/expenses";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default function useExpenseChart() {
  const store = expensesStore();
  const { getStatistic } = storeToRefs(store);

  onMounted(async () => {
    await store.getUsersStatistic();
  });

  const getData = async () => {
    await store.getUsersStatistic();
  };

  return { getStatistic, getData };
}
