import { defineStore } from "pinia";
import ExpenseService from "@/service/apiService/ExpenseService";

export const expensesStore = defineStore("expenses", {
  state: () => ({
    usersExpenses: [],
    allExpenses: [],
    usersTransactions: []
  }),
  getters: {
    getUsersExpenses: (state) => {
      return state.usersExpenses;
    },
    getAllExpenses: (state) => {
      return state.allExpenses;
    },
    getUsersTransactions(state) {
      return state.usersTransactions;
    }
  },
  actions: {
    setUsersExpenses(expenses) {
      this.usersExpenses = expenses;
    },
    async getUsersExpensesFromApi() {
      const { data } = await ExpenseService.getUserExpenses();
      this.usersExpenses = data;
    },
    async getAllExpensesFromApi() {
      const { data } = await ExpenseService.getAllExpenses();
      this.allExpenses = data;
    },
    async removeCategoryExpense(id) {
      try {
        await ExpenseService.removeExpense(id);
      } catch (e) {
        throw new Error(e);
      }
    },
    async createExpense(id) {
      try {
        await ExpenseService.addExpense({ expense_id: id });
      } catch (e) {
        throw new Error(e);
      }
    },
    async getUserTransactions() {
      const { data } = await ExpenseService.getAllCreatedExpenses();
      this.usersTransactions = data;
    },
    async createUserTransaction(expense) {
      try {
        await ExpenseService.createExpense(expense);
      } catch (e) {
        throw new Error(e);
      }
    }
  },
});
