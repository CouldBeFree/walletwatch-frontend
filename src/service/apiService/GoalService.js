import { Gateway } from "@/settings/axios";

class GoalService {
  static createGoal(goalData) {
    return Gateway.post("/goal", goalData);
  }

  static updateGoal(goalData, id) {
    return Gateway.put(`/goal/${id}`, goalData);
  }

  static removeGoal(goalData, id) {
    return Gateway.delete(`/goal/${id}`, goalData);
  }

  static getSingleGoal(id) {
    return Gateway.get(`/goal/${id}`);
  }

  static getGoals() {
    return Gateway.get("/goal");
  }
}

export default GoalService;
