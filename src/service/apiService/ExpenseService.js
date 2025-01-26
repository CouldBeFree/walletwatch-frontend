import { Gateway } from "@/settings/axios";

class ExpenseService {
  static removeExpense(id) {
    return Gateway.delete(`/expenses/${id}`);
  }

  static createExpense(expense) {
    return Gateway.post("/expenses", expense);
  }

  static updateExpense(expense, id) {
    return Gateway.put(`/expenses/${id}`, expense);
  }

  static getAllCreatedExpenses(date) {
    return Gateway.get("/expenses", {
      params: {
        ...(date && { startDate: date.startDate }),
        ...(date && { endDate: date.endDate }),
      },
    });
  }

  static getExpenseCategories() {
    return Gateway.get("/expenses/categories");
  }

  static getStatisticByDate(payload) {
    return Gateway.get("/statistic/expense", {
      params: { ...payload },
    });
  }

  static getExpense(id) {
    return Gateway.get(`/expenses/${id}`);
  }
}

export default ExpenseService;
