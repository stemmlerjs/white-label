
import { AssignInitialUsername } from "./AssignInitialUsername";
import { userRepo } from "../../repos";

const assignInitialUsername = new AssignInitialUsername(userRepo);

export {
  assignInitialUsername
}