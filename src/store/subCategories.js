import { defineStore } from "pinia";
import SubCategoryService from "@/service/apiService/SubCategoryService";

export const subCategories = defineStore("subCategories", {
  state: () => ({
    loading: true,
    subCategories: [],
  }),
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getAllSubCategories(state) {
      return state.subCategories;
    },
  },
  actions: {
    async getSubCategories(id) {
      this.loading = true;
      const { data } = await SubCategoryService.getSubCategories(id);
      this.subCategories = data;
      this.loading = false;
    },
    async createSubCategory(payload) {
      this.loading = true;
      try {
        await SubCategoryService.createSubCategories(payload);
      } catch (e) {
        throw new Error(e.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    async updateSubCategory(payload) {
      this.loading = true;
      try {
        await SubCategoryService.updatePayload(payload);
      } catch (e) {
        throw new Error(e.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    async removeSubCategory(id) {
      this.loading = true;
      try {
        await SubCategoryService.deleteSubCategory(id);
      } catch (e) {
        throw new Error(e.response.data.message);
      } finally {
        this.loading = false;
      }
    },
  },
});
