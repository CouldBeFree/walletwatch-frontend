import TransactionHistory from "@/service/apiService/TransactionHistory";
import { onMounted, reactive } from "vue";
import useDateSelector from "@/composable/useDateSelector";

export default function useTransactionHistory() {
  const { getDate } = useDateSelector();
  const history = reactive([]);

  const getTransactionHistory = async (date) => {
    try {
      const { data } = await TransactionHistory.getTransactionHistory(date);
      Object.assign(history, { ...data });
    } catch (e) {
      console.error(e);
    }
  };

  onMounted(async () => {
    await getTransactionHistory(getDate("month"));
  });

  return { history, getTransactionHistory };
}
