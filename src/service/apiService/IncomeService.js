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
}

export default IncomeService;
