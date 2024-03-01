// Utilities
import { defineStore } from "pinia";

export const expensesStore = defineStore("expenses", {
  state: () => ({
    usersExpenses: [],
  }),
  getters: {
    getUsersExpenses: (state) => {
      return state.usersExpenses;
    },
  },
  actions: {
    setUsersExpenses(expenses) {
      this.usersExpenses = expenses;
    },
  },
});
