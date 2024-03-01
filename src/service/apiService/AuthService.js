import { Gateway } from "@/settings/axios";

class AuthService {
  static loginUser(userData) {
    return Gateway.post("/auth/login", userData);
  }

  static registerUser(userData) {
    return Gateway.post("/auth/register", userData);
  }

  static getUser() {
    return Gateway.get("/auth/getMe");
  }
}

export default AuthService;
