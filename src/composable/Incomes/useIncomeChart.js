import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default function useIncomeChart() {
  const store = incomesStore();
  const { getUsersStatistic } = storeToRefs(store);

  onMounted(async () => {
    console.log("store", store);
    await store.getUsersStatistic();
  });

  const getData = async () => {
    await store.getUsersStatistic();
  };

  return { getUsersStatistic, getData };
}
