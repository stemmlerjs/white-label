
import { AuthProviderProfileInfo } from "./authProviderProfileInfo";

export abstract class AuthProvider {
  abstract getProfileInfo: (...args) => Promise<AuthProviderProfileInfo>;
  abstract checkValidAuthToken: (...args) => Promise<boolean>;
}
