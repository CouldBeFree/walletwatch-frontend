<template>
  <v-btn
    variant="flat"
    color="primary"
    size="large"
    prepend-icon="mdi-plus"
    @click="dialog = true"
    class="mb-4"
  >
    Add Goal
  </v-btn>
  <v-row>
    <v-col v-for="item in value" :key="item.id" lg="4" xl="2" xxl="3">
      <GoalCard
        @onAddAmount="onAddAmount"
        @onUpdate="onHandleAmount"
        @onRemove="$emit('onDelete', $event)"
        :value="item"
        :loading="loading"
      />
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" width="500px">
    <v-card>
      <v-card-title>{{ goalState.id ? "Edit" : "Create" }}</v-card-title>
      <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
        <v-card-item>
          <v-text-field
            v-model="goalState.goal_name"
            :rules="goalNameRules"
            required
            label="Goal name"
            type="text"
          />
          <v-text-field
            v-model="goalState.target_amount"
            :rules="[(v) => !!v || 'Amount is required']"
            type="number"
            label="Target amount"
            required
          />
          <v-text-field
            v-model="goalState.already_saved"
            :rules="[(v) => !!v || 'Already saved amount is required']"
            type="number"
            label="Already saved amount"
            required
          />
          <v-text-field
            type="date"
            v-model="goalState.desired_date"
            :rules="[(v) => !!v || 'Goal desired date is required']"
          ></v-text-field>
          <v-select
            label="Select currency"
            v-model="goalState.currency"
            :items="CURRENCY"
            item-value="name"
            item-title="name"
            required
          />
          <v-card-actions>
            <v-spacer />
            <v-btn variant="flat" color="primary" @click="onModalClose">
              Cancel
            </v-btn>
            <v-btn
              @click="onSubmit"
              variant="flat"
              color="primary"
              type="submit"
              :loading="loading"
            >
              {{ goalState.id ? "Edit" : "Create" }}
            </v-btn>
          </v-card-actions>
        </v-card-item>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog v-model="addAmountDialog" width="500px">
    <v-card>
      <v-card-title>{{ goalState.id ? "Edit" : "Create" }}</v-card-title>
      <v-form @submit.prevent ref="form" v-model="valid" lazy-validation>
        <v-card-item>
          <v-text-field
            v-model="goalState.already_saved"
            :rules="[(v) => !!v || 'Amount is required']"
            type="number"
            label="Add amount"
            required
          />
          <v-card-actions>
            <v-spacer />
            <v-btn variant="flat" color="primary" @click="onModalClose">
              Cancel
            </v-btn>
            <v-btn
              @click="onSubmit"
              variant="flat"
              color="primary"
              type="submit"
              :loading="loading"
            >
              Add amount
            </v-btn>
          </v-card-actions>
        </v-card-item>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import useFormStatusHandler from "@/composable/useFormStatusHandler";
import { goalNameRules } from "@/settings/validationRules";
import { CURRENCY } from "@/constants";
import GoalCard from "@/components/GoalsContainer/GoalCard.vue";

const { valid } = useFormStatusHandler();
const dialog = ref(false);
const addAmountDialog = ref(false);
const props = defineProps(["loading", "value"]);
const emit = defineEmits(["onCreate", "onUpdate", "onDelete"]);

const initialGoalState = {
  id: null,
  goal_name: null,
  target_amount: null,
  already_saved: null,
  desired_date: null,
  currency: null,
};

const goalState = reactive({ ...initialGoalState });

const onAddAmount = (value) => {
  Object.assign(goalState, { ...value });
  addAmountDialog.value = true;
};

const onHandleAmount = (value) => {
  dialog.value = true;
  Object.assign(goalState, { ...value });
};

const resetState = () => {
  Object.assign(goalState, { ...initialGoalState });
};

const onSubmit = () => {
  goalState.id
    ? emit("onUpdate", { ...goalState })
    : emit("onCreate", { ...goalState });
  resetState();
  dialog.value = false;
  addAmountDialog.value = false;
};

const onModalClose = () => {
  dialog.value = false;
  resetState();
};
</script>

<style scoped></style>
