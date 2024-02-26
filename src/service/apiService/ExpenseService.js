import { Gateway } from "@/settings/axios";

class ExpenseService {
  static getAllExpenses() {
    return Gateway.get('/expenses');
  }

  static getUserExpenses() {
    return Gateway.get('/expenses/mine');
  }

  static removeExpense(id) {
    return Gateway.delete(`/expenses/${id}`);
  }

  static addExpense(data) {
    return Gateway.post('/expenses', data);
  }

  static createExpense(expense) {
    return Gateway.post('/operation/expense', expense);
  }

  static updateExpense(expense, id) {
    return Gateway.put(`/operation/expense/${id}`, expense);
  }

  static getAllCreatedExpenses() {
    return Gateway.get('/operation/expense');
  }
}

export default ExpenseService;
