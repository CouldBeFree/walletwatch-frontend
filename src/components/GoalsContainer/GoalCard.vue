<template>
  <v-card :loading="loading" class="mx-auto text-center" variant="tonal">
    <v-card-title>
      {{ value.goal_name }}
    </v-card-title>
    <v-card-text>
      <v-progress-circular
        :model-value="percent"
        :rotate="360"
        :size="100"
        :width="10"
        color="teal"
      >
        <div>
          <p class="text-h6">{{ percent }}%</p>
        </div>
      </v-progress-circular>
      <p class="text-h7 mt-2 mb-2">
        Desired amount {{ value?.target_amount }}{{ currencyIcon }}
      </p>
      <p class="text-h7">
        Already saved {{ value?.already_saved }}{{ currencyIcon }}
      </p>
      <!--      <v-icon size="small"> mdi-delete </v-icon>-->
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="action-wrapper">
        <v-btn
          @click="onEmitData('addAmount')"
          variant="flat"
          color="green"
          width="full-width"
          block
        >
          Add saved amount
        </v-btn>
        <v-btn
          @click="onEmitData('edit')"
          variant="flat"
          color="primary"
          width="full-width"
          block
        >
          Edit
        </v-btn>
        <v-btn variant="flat" color="red" width="full-width" block>
          Remove
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["value", "loading"]);
const emit = defineEmits(["onUpdate", "onAddAmount", "onRemove"]);

const onEmitData = (type) => {
  switch (type) {
    case "addAmount":
      emit("onAddAmount", { ...props.value });
      break;
    case "edit":
      emit("onUpdate", { ...props.value });
      break;
  }
};

const percent = computed(() => {
  return (
    (props.value?.already_saved * 100) /
    props.value?.target_amount
  ).toFixed(1);
});

const currencyIcon = computed(() =>
  props.value.currency === "uah" ? "₴" : "$",
);
</script>

<style scoped>
.action-wrapper {
  width: 100%;
}

.action-wrapper button {
  margin-left: 0 !important;
  margin-bottom: 12px;
}
</style>
