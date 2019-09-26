
import { AfterUserCreated } from "./AfterUserCreated";
import { assignInitialUsername } from "../useCases/assignInitialUsername";

// Subscribers
new AfterUserCreated(
  assignInitialUsername
)