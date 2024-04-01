<template>
  <v-card class="mx-auto">
    <v-list>
      <v-list-item
        v-for="item in history"
        :key="item.id"
        :title="`${item.amount} ₴`"
        :subtitle="item.transaction_date"
      >
        <template v-slot:subtitle="{ subtitle }">
          <div v-html="subtitle"></div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
  {{ history }}
</template>

<script setup>
import useTransactionHistory from "@/composable/useTransactionHistory";

const { history } = useTransactionHistory();
</script>

<style scoped></style>
