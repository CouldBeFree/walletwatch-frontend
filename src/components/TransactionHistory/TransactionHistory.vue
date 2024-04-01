<template>
  <v-card class="mx-auto pa-4">
    <v-row>
      <v-col v-for="item in props?.value" :key="item.id" cols="12" sm="6" md="4" lg="3" xl="3" xxl="3">
        <v-card class="mx-auto" variant="tonal">
          <template v-slot:title>
            {{ item.category_name }}
          </template>

          <v-card-text
            :class="{
              'text-green-accent-3': !item.expenses,
              'text-red-accent-3': item.expenses,
            }"
          >
            {{ item.amount }}₴
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
const props = defineProps(["value"]);
</script>

<style scoped></style>
