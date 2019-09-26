
import axios from 'axios';
import { AuthProviderProfileInfo } from '../models/authProviderProfileInfo';
import { AuthProvider } from '../models/authProvider';

export interface IFacebookService extends AuthProvider {
  getProfileInfo: (token: string, userId: number) => Promise<AuthProviderProfileInfo>;
  checkValidAuthToken: (token: string, userId: number) => Promise<boolean>;
}

export class FacebookService implements IFacebookService {
  constructor () {
  }

  public async getProfileInfo (token: string, userId: number) : Promise<AuthProviderProfileInfo> {
    const response = await axios({
      method: 'GET',
      url: `https://graph.facebook.com/${userId}?access_token=${token}&fields=name,email,picture.width(500).height(500)`
    });

    return { 
      fullName: response.data.name,
      profilePictureUrl: response.data.picture.data.url,
      userId: response.data.id,
      userEmail: response.data.email
    }
  }

  public async checkValidAuthToken (token: string, userId: number) : Promise<boolean> {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://graph.facebook.com/${userId}?access_token=${token}`
      });
      return Number(response.data.id) === Number(userId);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}