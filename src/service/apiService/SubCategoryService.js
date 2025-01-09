import { Gateway } from "@/settings/axios";

class SubCategoryService {
  static getSubCategories(id) {
    return Gateway.get(`/expense-sub-category/${id}`)
  }

  static createSubCategories(payload) {
    return Gateway.post('/expense-sub-category', payload)
  }

  static updatePayload(payload) {
    return Gateway.put(`/expense-sub-category/${payload._id}`, payload)
  }

  static deleteSubCategory(id) {
    return Gateway.delete(`/expense-sub-category/${id}`)
  }
}

export default SubCategoryService;
