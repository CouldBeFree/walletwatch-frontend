import { defineStore } from "pinia";
import IncomeService from "@/service/apiService/IncomeService";

export const incomesStore = defineStore("incomes", {
  state: () => ({
    usersIncomes: [],
    allIncomes: [],
    usersTransactions: [],
    statistic: [],
    userIncomeCategories: [],
  }),
  getters: {
    getIncomeCategories: (state) => {
      return state.userIncomeCategories;
    },
    getUsersIncomes: (state) => {
      return state.usersIncomes;
    },
    getAllIncomes: (state) => {
      return state.allIncomes;
    },
    getUsersTransactions(state) {
      return state.usersTransactions;
    },
    getStatistic(state) {
      return state.statistic;
    },
  },
  actions: {
    async getIncomesCategoriesFromApi() {
      const { data } = await IncomeService.getIncomesCategories();
      this.userIncomeCategories = data;
    },
    async getUsersIncomesFromApi() {
      const { data } = await IncomeService.getUsersIncomes();
      this.usersIncomes = data;
    },
    async getAllIncomesFromApi(date) {
      const { data } = await IncomeService.getAllIncomes(date);
      this.allIncomes = data;
    },
    async removeCategoryIncome(id) {
      try {
        await IncomeService.removeIncome(id);
      } catch (e) {
        throw new Error(e);
      }
    },
    async createIncome(id) {
      try {
        await IncomeService.addIncome(id);
      } catch (e) {
        throw new Error(e);
      }
    },
    async getUserIncomes(date) {
      const { data } = await IncomeService.getAllCreatedIncomes(date);
      this.usersTransactions = data;
    },
    async updateUserTransaction(income) {
      console.log("income", income);
      try {
        await IncomeService.updateIncome(income, income.id);
      } catch (e) {
        throw new Error(e);
      }
    },
    async createUserTransaction(income) {
      try {
        await IncomeService.createTransaction(income);
      } catch (e) {
        throw new Error(e);
      }
    },
    async deleteUserTransaction(id) {
      try {
        await IncomeService.deleteUserIncome(id);
      } catch (e) {
        throw new Error(e);
      }
    },
    async getUsersStatistic(date) {
      const { data } = await IncomeService.getStatisticByDate(date);
      this.statistic = data;
    },
  },
});
