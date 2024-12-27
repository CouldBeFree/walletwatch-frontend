<template>
  <v-sheet class="mx-auto">
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="n in filters" :key="n.type">
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
  <v-dialog v-model="isSelectDayModalOpen" width="400" max-width="600">
    <v-card>
      <v-divider></v-divider>
      <v-card-item>
        <v-date-picker
          :multiple="isDateSelectorMultiple"
          title="Select Day"
          v-model="rawSelectedDate"
        ></v-date-picker>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCancelDate" variant="flat" color="primary">
          Close
        </v-btn>
        <v-btn @click="onSaveDate" variant="flat" color="primary">
          Select date
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import useDateSelector from "@/composable/useDateSelector";

const { getDate, formatDate } = useDateSelector();

const emit = defineEmits(["selectDate"]);
const filters = [
  {
    type: "month",
    text: "Місяць",
  },
  {
    type: "allTime",
    text: "Весь час",
  },
  {
    type: "day",
    text: "Обрати день",
  },
  {
    type: "week",
    text: "Тиждень",
  },
  {
    type: "today",
    text: "Сьогодні",
  },
  {
    type: "year",
    text: "Рік",
  },
  {
    type: "range",
    text: "Діапазон дат",
  },
];
const selectedType = ref("month");
const isSelectDayModalOpen = ref(false);
const rawSelectedDate = ref(null);
const selectedDay = ref(null);

const onCancelDate = () => {
  isSelectDayModalOpen.value = false;
};

const isDateSelectorMultiple = computed(() => selectedType.value === "range");

const formattedDay = computed(() => {
  if (rawSelectedDate.value && Array.isArray(rawSelectedDate.value)) {
    return {
      startDate: formatDate(rawSelectedDate.value[0]),
      endDate: formatDate(
        rawSelectedDate.value[rawSelectedDate.value.length - 1],
      ),
    };
  }
  if (rawSelectedDate.value && typeof rawSelectedDate.value === "object") {
    return {
      startDate: formatDate(rawSelectedDate.value),
      endDate: formatDate(rawSelectedDate.value),
    };
  }
  return null;
});

const onSaveDate = () => {
  emit("selectDate", formattedDay.value);
  isSelectDayModalOpen.value = false;
};

const handleClick = (type) => {
  if (type === "day" || type === "range") {
    selectedType.value = type;
    isSelectDayModalOpen.value = true;
    return;
  }
  getDate(type);
  selectedType.value = type;
  const date = getDate(type);
  if (date) {
    emit("selectDate", date);
  }
};

watch(isSelectDayModalOpen, (newVal) => {
  if (!newVal) selectedDay.value = null;
});
</script>

<style scoped></style>
