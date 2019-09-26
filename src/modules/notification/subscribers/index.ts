
import { AfterUserCreated } from "./AfterUserCreated";
import { notifySlackChannel } from "../useCases/notifySlackChannel";
import { AfterVinylCreated } from "./AfterVinylCreated";

// Subscribers
new AfterUserCreated(notifySlackChannel);
new AfterVinylCreated();