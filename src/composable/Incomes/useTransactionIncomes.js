import { incomesStore } from "@/store/incomes";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

export default function useTransactionIncomes() {
  const store = incomesStore();
  const { getUsersTransactions } = storeToRefs(store);

  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    await store.getUsersIncomes();
    loading.value = false;
  });

  return { loading, getUsersTransactions };
}
