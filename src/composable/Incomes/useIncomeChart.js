import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import useDateSelector from "@/composable/useDateSelector";

export default function useIncomeChart() {
  const { getDate } = useDateSelector();
  const store = incomesStore();
  const { getStatistic } = storeToRefs(store);

  onMounted(async () => {
    await store.getUsersStatistic(getDate("allTime"));
  });

  const getData = async (date) => {
    await store.getUsersStatistic(date);
  };

  return { getStatistic, getData };
}
