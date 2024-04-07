import { ref, reactive } from "vue";
import proxy from "@/utils/proxy";
import GoalService from "@/service/apiService/GoalService";
import { FIRE_SNACK } from "@/constants";
import getErrorMessage from "@/utils/getErrorMessage";

export default function useGoal() {
  const loading = ref(false);

  const goals = reactive([]);

  const getGoals = async () => {
    loading.value = true;
    const { data } = await GoalService.getGoals();
    Object.assign(goals, { ...data });
    loading.value = false;
  };

  const onUpdateGoal = async (value) => {
    loading.value = true;
    try {
      await GoalService.updateGoal(value, value.id);
      await getGoals();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
    } finally {
      loading.value = false;
    }
  };

  const createGoal = async (value) => {
    try {
      loading.value = true;
      await GoalService.createGoal(value);
      await getGoals();
      proxy.publish(FIRE_SNACK, { type: "green", text: "Success" });
    } catch (e) {
      const errorMsg = getErrorMessage(e);
      proxy.publish(FIRE_SNACK, { type: "red", text: errorMsg });
    } finally {
      loading.value = false;
    }
  };

  return { createGoal, getGoals, loading, goals, onUpdateGoal };
}
