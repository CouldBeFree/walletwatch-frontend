import {expensesStore} from "@/store/expenses";
import {onMounted, ref, toRaw} from "vue";
import {storeToRefs} from "pinia";
import proxy from "@/utils/proxy";
import {FIRE_SNACK} from "@/constants";
import getErrorMessage from "@/utils/getErrorMessage";

export default function useTransactionExpenses () {
  const store = expensesStore();
  const { getUsersTransactions } = storeToRefs(store);

  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    await store.getUserTransactions();
    loading.value = false;
  });

  const onUpdate = (val) => {
    console.log('update', toRaw(val));
  }

  const onCreate = async (val) => {
    try {
      await store.createUserTransaction(val);
      await store.getUserTransactions();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
    }
  }

  return { getUsersTransactions, onUpdate, onCreate };
}
