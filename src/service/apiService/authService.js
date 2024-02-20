import { Gateway } from "@/settings/axios";

class AuthService {
  static loginUser(userData) {
    return Gateway.post('/api/auth/login', userData)
  }
}

export default AuthService;
