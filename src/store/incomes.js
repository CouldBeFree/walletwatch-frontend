import { defineStore } from "pinia";
import IncomeService from "@/service/apiService/IncomeService";

export const incomesStore = defineStore("incomes", {
  state: () => ({
    usersIncomes: [],
    allIncomes: [],
    usersTransactions: [],
    statistic: [],
  }),
  getters: {
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
    async getUsersIncomesFromApi() {
      const { data } = await IncomeService.getUsersIncomes();
      this.usersIncomes = data;
    },
    async getAllIncomesFromApi() {
      const { data } = await IncomeService.getAllIncomes();
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
  },
});
