<template>
  <v-row>
    <v-col
      :key="cat._id"
      cols="12"
      xs="12"
      sm="12"
      md="6"
      lg="6"
      v-for="cat in props.value"
    >
      <v-card
        class="mx-auto"
        :href="`expense/${cat._id}`"
        :prepend-icon="getExpenseIcon(cat.name)"
        rel="noopener"
        :subtitle="`Конфігуруй ${cat.name}`"
        target="_self"
        :title="cat.name"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import getExpenseIcon from "@/utils/getExpenseIcon";
const props = defineProps(["value"]);
</script>

<style scoped></style>
