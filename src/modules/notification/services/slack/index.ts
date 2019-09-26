
import axios from 'axios'
import { SlackChannel } from '../../domain/slackChannel';

export interface ISlackService {
  sendMessage (text: string, channel: SlackChannel): Promise<any>
}

export class SlackService implements ISlackService {
  private growthChannelHookUrl: string = 'https://hooks.slack.com/services/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';
  private supportChannelHookUrl: string = 'https://hooks.slack.com/services/THKgeessd/Beese26CQ/mI66effeggeJCNa8bFVOwyAS';

  constructor () {

  }

  private getWebookUrl (channel: SlackChannel): string {
    switch (channel) {
      case 'growth':
        return this.growthChannelHookUrl;
      case 'support':
        return this.supportChannelHookUrl;
      default:
        return "";
    }
  }

  sendMessage (text: string, channel: SlackChannel): Promise<any> {
    const url: string = this.getWebookUrl(channel);
    return axios.post(url, { text });
  }

}