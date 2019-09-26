
import { RegisterWithGoogle } from "./RegisterWithGoogle";
import { RegisterWithGoogleController } from "./RegisterWithGoogleController";
import { userRepo } from "../../repos";
import { googleService } from "../../services/authProviders";

const registerWithGoogle = new RegisterWithGoogle(userRepo, googleService);
const registerWithGoogleController = new RegisterWithGoogleController(
  registerWithGoogle
)

export {
  registerWithGoogle,
  registerWithGoogleController
}