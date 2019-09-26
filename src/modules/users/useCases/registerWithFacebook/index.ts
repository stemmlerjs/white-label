
import { RegisterWithFacebook } from "./RegisterWithFacebook";
import { RegisterWithFacebookController } from "./RegisterWithFacebookController";
import { userRepo } from "../../repos";
import { facebookService } from "../../services/authProviders";

const registerWithFacebook = new RegisterWithFacebook(userRepo, facebookService);
const registerWithFacebookController = new RegisterWithFacebookController(
  registerWithFacebook
);

export {
  registerWithFacebook,
  registerWithFacebookController
}