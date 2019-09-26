
import axios from 'axios'
import { AuthProviderProfileInfo } from '../models/authProviderProfileInfo';
import { AuthProvider } from '../models/authProvider';

export interface IGoogleService extends AuthProvider {
  getProfileInfo: (token: string) => Promise<AuthProviderProfileInfo>;
  checkValidAuthToken: (token: string) => Promise<boolean>;
}

export class GoogleService implements IGoogleService {
  constructor () {}

  public async getProfileInfo (token: string) : Promise<AuthProviderProfileInfo> {
    const response = await axios({
      method: 'GET',
      url: `https://www.googleapis.com/plus/v1/people/me?access_token=${token}`
    });

    const data = response.data;
    return {
      fullName: data.displayName,
      firstName: data.name.givenName,
      lastName: data.name.familyName,
      profilePictureUrl: data.image.url.replace('s50', 's500'),
      userId: data.id,
      userEmail: data.emails[0].value
    }
  }

  async checkValidAuthToken (token: string) : Promise<boolean> {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://www.googleapis.com/plus/v1/people/me?access_token=${token}`
      });
  
      return response.data.hasOwnProperty('id');
    } catch (err) {
      return false;
    }
  }
}