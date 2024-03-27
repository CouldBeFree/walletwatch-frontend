import { Gateway } from "@/settings/axios";

class ExpenseService {
  static getAllExpenses() {
    return Gateway.get("/expenses");
  }

  static getUserExpenses() {
    return Gateway.get("/expenses/mine");
  }

  static removeExpense(id) {
    return Gateway.delete(`/expenses/${id}`);
  }

  static addExpense(data) {
    return Gateway.post("/expenses", data);
  }

  static createExpense(expense) {
    return Gateway.post("/operation/expense", expense);
  }

  static updateExpense(expense, id) {
    return Gateway.put(`/operation/expense/${id}`, expense);
  }

  static getAllCreatedExpenses(date) {
    return Gateway.get("/operation/expense", {
      params: {
        ...(date && { startDate: date.startDate }),
        ...(date && { endDate: date.endDate }),
      },
    });
  }

  static deleteExpense(id) {
    return Gateway.delete(`/operation/expense/${id}`);
  }

  static getStatisticByDate(date) {
    return Gateway.get("/expenses/user/statistic", {
      params: {
        ...(date && { startDate: date.startDate }),
        ...(date && { endDate: date.endDate }),
      },
    });
  }
}

export default ExpenseService;
