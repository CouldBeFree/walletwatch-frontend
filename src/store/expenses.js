import { defineStore } from "pinia";
import ExpenseService from "@/service/apiService/ExpenseService";

export const expensesStore = defineStore("expenses", {
  state: () => ({
    allExpenses: [],
    expenseCategories: [],
    statistic: [],
    loading: false
  }),
  getters: {
    getLoading(state) {
      return state.loading
    },
    getAllExpenses(state) {
      return state.allExpenses;
    },
    getUserExpenseCategories(state) {
      return state.expenseCategories;
    },
    getStatistic(state) {
      return state.statistic;
    },
  },
  actions: {
    async getCategories() {
      this.loading = true;
      const { data } = await ExpenseService.getExpenseCategories();
      this.loading = false;
      this.expenseCategories = data;
    },
    async removeCategoryExpense(id) {
      this.loading = true;
      try {
        await ExpenseService.removeExpense(id);
      } catch (e) {
        throw new Error(e);
      } finally {
        this.loading = false;
      }
    },
    async getUserTransactions(date) {
      this.loading = true;
      const { data } = await ExpenseService.getAllCreatedExpenses(date);
      this.loading = false;
      this.allExpenses = data;
    },
    async createUserTransaction(expense) {
      this.loading = true;
      try {
        await ExpenseService.createExpense(expense);
      } catch (e) {
        throw new Error(e);
      } finally {
        this.loading = false;
      }
    },
    async updateUserTransaction(expense) {
      this.loading = true;
      try {
        await ExpenseService.updateExpense(expense, expense.id);
      } catch (e) {
        throw new Error(e);
      } finally {
        this.loading = false;
      }
    },
    async deleteUserTransaction(id) {
      this.loading = true;
      try {
        await ExpenseService.deleteExpense(id);
      } catch (e) {
        throw new Error(e);
      } finally {
        this.loading = false;
      }
    },
    async getUsersStatistic(date) {
      this.loading = true;
      const { data } = await ExpenseService.getStatisticByDate(date);
      this.loading = false;
      this.statistic = data;
    },
  },
});
