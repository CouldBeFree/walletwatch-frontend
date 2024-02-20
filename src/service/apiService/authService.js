import { Gateway } from "@/settings/axios";

class AuthService {
  static loginUser(userData) {
    return Gateway.post('/auth/login', userData);
  }

  static registerUser(userData) {
    return Gateway.post('/auth/register', userData);
  }
}

export default AuthService;
