<template>
  <v-sheet
    max-width="600"
  >
    <v-slide-group
      show-arrows
    >
      <v-slide-group-item
        v-for="n in filters"
        :key="n.type"
      >
        <v-btn
          :color="selectedType === n.type ? 'primary' : undefined"
          class="ma-2"
          rounded
          @click="handleClick(n.type)"
        >
          {{ n.text }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
  import { ref } from "vue";
  import useDateSelector from "@/composable/useDateSelector";

  const { getDate } = useDateSelector();

  const filters = [
    {
      type: 'allTime',
      text: 'All time'
    },
    {
      type: 'day',
      text: 'Choose day'
    },
    {
      type: 'week',
      text: 'Week'
    },
    {
      type: 'today',
      text: 'Today'
    },
    {
      type: 'year',
      text: 'Year'
    },
    {
      type: 'month',
      text: 'Month'
    },
    {
      type: 'range',
      text: 'Date range'
    },
  ];
  const selectedType = ref('allTime');

  const handleClick = (type) => {
    getDate(type);
    selectedType.value = type;
  }
</script>

<style scoped>

</style>
