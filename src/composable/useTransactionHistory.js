import TransactionHistory from "@/service/apiService/TransactionHistory";
import { onMounted, reactive, ref } from "vue";
import useDateSelector from "@/composable/useDateSelector";

export default function useTransactionHistory() {
  const { getDate } = useDateSelector();
  const history = reactive([]);
  const loading = ref(false);

  const getTransactionHistory = async (date) => {
    loading.value = true;
    try {
      const { data } = await TransactionHistory.getTransactionHistory(date);
      Object.assign(history, { ...data });
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await getTransactionHistory(getDate("month"));
  });

  return { history, getTransactionHistory, loading };
}
