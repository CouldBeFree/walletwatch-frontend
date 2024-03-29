import { Gateway } from "@/settings/axios";

class IncomeService {
  static getAllIncomes() {
    return Gateway.get("/incomes");
  }

  static addIncome(data) {
    return Gateway.post("/incomes", data);
  }

  static removeIncome(id) {
    return Gateway.delete(`/incomes/${id}`);
  }

  static getUsersIncomes() {
    return Gateway.get("/incomes/mine");
  }

  static getAllCreatedIncomes(date) {
    return Gateway.get("/operation/income", {
      params: {
        ...(date && { startDate: date.startDate }),
        ...(date && { endDate: date.endDate }),
      },
    });
  }

  static updateIncome(income, id) {
    return Gateway.put(`/operation/income/${id}`, income);
  }

  static deleteUserIncome(id) {
    return Gateway.delete(`/operation/income/${id}`);
  }

  static createTransaction(income) {
    return Gateway.post("/operation/income", income);
  }

  static getStatisticByDate(date) {
    return Gateway.get("/incomes/user/statistic", {
      params: {
        ...(date && { startDate: date.startDate }),
        ...(date && { endDate: date.endDate }),
      },
    });
  }
}

export default IncomeService;
