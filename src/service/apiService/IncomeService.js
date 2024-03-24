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

  static getAllCreatedIncomes() {
    return Gateway.get("/operation/income");
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

  static getStatisticByDate() {
    const date = new Date();
    const endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return Gateway.get("/incomes/user/statistic", {
      params: {
        startDate: "2014-01-01",
        endDate: endDate,
      },
    });
  }
}

export default IncomeService;
