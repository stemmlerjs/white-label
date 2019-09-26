
import { NotifySlackChannel } from "./NotifySlackChannel";
import { slackService } from "../../services";

const notifySlackChannel = new NotifySlackChannel(slackService);

export {
  notifySlackChannel
}