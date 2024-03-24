import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default function useIncomeChart() {
  const store = incomesStore();
  const { getStatistic } = storeToRefs(store);

  onMounted(async () => {
    await store.getUsersStatistic();
  });

  const getData = async () => {
    await store.getUsersStatistic();
  };

  return { getStatistic, getData };
}
