import { Gateway } from "@/settings/axios";

class IncomeService {
  static getAllIncomes(date) {
    return Gateway.get("/incomes", {
      params: {
        ...(date && { startDate: date.startDate }),
        ...(date && { endDate: date.endDate }),
      },
    });
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

  static getIncomesCategories() {
    return Gateway.get('/incomes/categories');
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
    return Gateway.put(`/incomes/${id}`, income);
  }

  static deleteUserIncome(id) {
    return Gateway.delete(`/incomes/${id}`);
  }

  static createTransaction(income) {
    return Gateway.post("/incomes", income);
  }

  static getStatisticByDate(date) {
    return Gateway.get("/statistic/incomes", {
      params: {
        ...(date && { startDate: date.startDate }),
        ...(date && { endDate: date.endDate }),
      },
    });
  }
}

export default IncomeService;
