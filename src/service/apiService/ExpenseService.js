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

  static getAllCreatedExpenses() {
    return Gateway.get("/operation/expense");
  }

  static deleteExpense(id) {
    return Gateway.delete(`/operation/expense/${id}`);
  }

  static getStatisticByDate() {
    const date = new Date();
    const endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return Gateway.get("/expenses/user/statistic", {
      params: {
        startDate: "2014-01-01",
        endDate: endDate,
      },
    });
  }
}

export default ExpenseService;
