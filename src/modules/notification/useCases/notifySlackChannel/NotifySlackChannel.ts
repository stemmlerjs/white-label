
import { UseCase } from "../../../../core/domain/UseCase";
import { SlackChannel } from "../../domain/slackChannel";
import { ISlackService } from "../../services/slack";

interface Request {
  channel: SlackChannel;
  message: string;
}

export class NotifySlackChannel implements UseCase<Request, Promise<void>> {
  private slackService: ISlackService;

  constructor (slackService: ISlackService) {
    this.slackService = slackService;
  }

  async execute (req: Request): Promise<void> {
    await this.slackService.sendMessage(req.message, req.channel);
  }
}

