import { Repo } from "../../core/infra/Repo";
import { User } from "../domain/user";
import { UserId } from "../domain/userId";
import { UserMap } from "../mappers/UserMap";

interface IUserRepo extends Repo<User> {
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

  public async exists (userId: UserId): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where['base_user_id'] = userId.id.toString();
    const user = await this.models.BaseUser.findOne(baseQuery);
    return !!user === true;
  }

  public async save (user: User): Promise<User> {
    const exists = await this.exists(user.userId);
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