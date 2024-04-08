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
        Desired amount {{ commaSeparator(value?.target_amount)
        }}{{ currencyIcon }}
      </p>
      <p class="text-h7">
        Already saved {{ commaSeparator(value?.already_saved)
        }}{{ currencyIcon }}
      </p>
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
        <v-btn
          variant="flat"
          color="red"
          width="full-width"
          block
          @click="dialogDelete = true"
        >
          Remove
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="dialogDelete" scrollable max-width="500px" width="400">
    <v-card>
      <v-card-title class="text-h5">Remove {{ value.goal_name }}?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="flat"
          @click="dialogDelete = false"
          >Cancel</v-btn
        >
        <v-btn
          color="blue-darken-1"
          variant="flat"
          @click="deleteItemConfirm"
          :loading="loading"
          >Remove</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import commaSeparator from "@/utils/commaSeparator";

const props = defineProps(["value", "loading"]);
const emit = defineEmits(["onUpdate", "onAddAmount", "onRemove"]);

const dialogDelete = ref(false);

const deleteItemConfirm = () => {
  emit("onRemove", props.value.id);
  dialogDelete.value = false;
};

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
