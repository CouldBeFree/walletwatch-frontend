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

  <v-dialog v-model="isSelectMonthModalOpen" width="400" max-width="600">
    <v-card>
      <v-divider></v-divider>
      <v-card-item>
        <v-date-picker
          v-model="selectedMonth"
          title="Select Month"
          :show-adjacent-months="false"
          view-mode="months"
        ></v-date-picker>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onCancelMonth" variant="flat" color="primary">
          Close
        </v-btn>
        <v-btn @click="onSaveMonth" variant="flat" color="primary">
          Select month
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
    type: "selectMonth",
    text: "Оберіть місяць",
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
const isSelectMonthModalOpen = ref(false);
const rawSelectedDate = ref(null);
const selectedMonth = ref(null);
const selectedDay = ref(null);

const onCancelDate = () => {
  isSelectDayModalOpen.value = false;
};

const onCancelMonth = () => {
  isSelectMonthModalOpen.value = false;
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
  if (type === "selectMonth") {
    selectedType.value = type;
    isSelectMonthModalOpen.value = true;
    return;
  }
  selectedType.value = type;
  const date = getDate(type);
  if (date) emit("selectDate", date);
};

const onSaveMonth = () => {
  if (selectedMonth.value) {
    const date = {
      startDate: formatDate(new Date(selectedMonth.value + "-01")),
      endDate: formatDate(
        new Date(
          new Date(selectedMonth.value + "-01").getFullYear(),
          new Date(selectedMonth.value + "-01").getMonth() + 1,
          0,
        ),
      ),
    };
    console.log({ date });
    emit("selectDate", date);
  }
  isSelectMonthModalOpen.value = false;
};

watch(isSelectDayModalOpen, (newVal) => {
  if (!newVal) selectedDay.value = null;
});

watch(isSelectMonthModalOpen, (newVal) => {
  if (!newVal) selectedMonth.value = null;
});
</script>

<style scoped></style>
