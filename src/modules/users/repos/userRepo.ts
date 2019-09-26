
import { User } from "../domain/user";
import { UserMap } from "../mappers/UserMap";
import { UserEmail } from "../domain/userEmail";

export interface IUserRepo {
  findUserByEmail(email: UserEmail): Promise<User>;
  exists (email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}

export class UserRepo implements IUserRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery () {
    const { models } = this;
    return {
      where: {},
      include: [
        { model: models.Trader, as: 'Trader', required: false }
      ]
    }
  }

  public async findUserByEmail(email: UserEmail): Promise<User> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_email'] = email.value.toString();
    const user = await this.models.BaseUser.findOne(baseQuery);
    if (!!user === true) return user;
    return null;
  }

  public async exists (email: UserEmail): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['user_email'] = email.value.toString();
    const user = await this.models.BaseUser.findOne(baseQuery);
    return !!user === true;
  }

  public async save (user: User): Promise<void> {
    const exists = await this.exists(user.email);
    const rawUser = UserMap.toPersistence(user);
    
    if (!exists) {
      // Create new
      return null;
    } 
    
    else {
      // Save old
    }
  }
}