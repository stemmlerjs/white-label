
import { FacebookService } from "./providers/facebookProvider";
import { GoogleService } from "./providers/googleProvider";

const facebookService = new FacebookService();
const googleService = new GoogleService();

export {
  facebookService,
  googleService
}