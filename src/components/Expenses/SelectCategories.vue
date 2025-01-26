<template>
  <v-row>
    <v-col cols="12" md="4" sm="3" v-for="item in model" :key="item.id">
      <v-checkbox
        color="primary"
        :label="item.name"
        v-model="item.checked"
        @change="onUpdate"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps(["categories"]);
const emit = defineEmits(["onSelect"]);

const model = reactive([]);

const onUpdate = () => {
  const selectedIds = model.filter((el) => el.checked).map((el) => el._id);
  emit("onSelect", selectedIds);
};

watch(
  () => props.categories,
  (newCategories) => {
    if (newCategories && Array.isArray(newCategories)) {
      model.splice(
        0,
        model.length,
        ...newCategories.map((category) => ({
          ...category,
          checked: true,
        })),
      );
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
