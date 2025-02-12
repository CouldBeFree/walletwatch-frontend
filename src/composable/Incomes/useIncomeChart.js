import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import useDateSelector from "@/composable/useDateSelector";

export default function useIncomeChart() {
  const { getDate } = useDateSelector();
  const store = incomesStore();
  const { getStatistic } = storeToRefs(store);
  const loading = ref(false);
  const { getUsersStatistic } = store;

  onMounted(async () => {
    loading.value = true;
    await getUsersStatistic(getDate("month"));
    loading.value = false;
  });

  const getData = async (date) => {
    loading.value = true;
    await getUsersStatistic(date);
    loading.value = false;
  };

  return { getStatistic, getData, loading };
}
