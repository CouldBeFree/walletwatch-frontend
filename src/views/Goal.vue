<template>
  <v-row>
    <v-col cols="12" lg="12">
      <GoalsContainer
        @onCreate="createGoal"
        :value="goals"
        :loading="loading"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import GoalsContainer from "@/components/GoalsContainer/GoalsContainer.vue";
import useGoal from "@/composable/useGoal";
import { onMounted } from "vue";

const { createGoal, loading, getGoals, goals } = useGoal();

onMounted(async () => {
  await getGoals();
});
</script>

<style scoped></style>
