import { Gateway } from "@/settings/axios";

class TransactionHistory {
  static getTransactionHistory(date) {
    return Gateway.get("/transaction-history", {
      params: {
        ...(date && { startDate: date.startDate }),
        ...(date && { endDate: date.endDate }),
      },
    });
  }
}

export default TransactionHistory;
