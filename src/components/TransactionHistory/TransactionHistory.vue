<template>
  <v-card class="mx-auto pa-4" :loading="loading">
    <v-row>
      <v-col
        v-for="item in props?.value"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        xxl="3"
      >
        <v-card
          class="mx-auto"
          variant="tonal"
          :prepend-icon="setIcon(item.expenses, item.category_name)"
        >
          <template v-slot:title>
            {{ item.category_name }}
          </template>

          <v-card-text
            :class="{
              'text-green-accent-3': !item.expenses,
              'text-red-accent-3': item.expenses,
            }"
          >
            {{ commaSeparator(item.amount) }}₴
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import getExpenseIcon from "@/utils/getExpenseIcon";
import getIncomeIcon from "@/utils/getIncomeIcon";
import commaSeparator from "@/utils/commaSeparator";

const setIcon = (isExpense, categoryName) => {
  if (isExpense) {
    return getExpenseIcon(categoryName);
  }
  return getIncomeIcon(categoryName);
};

const props = defineProps(["value", "loading"]);
</script>

<style scoped></style>
