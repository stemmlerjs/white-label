import { Mapper } from "../../../core/infra/Mapper";
import { User } from "../domain/user";

export class UserMap extends Mapper<User> {

  public static toPersistence (user: User): any {
    return {
      base_user_id: user.id.toString(),
      user_email: user.email.value,
      user_password: user.password.value,
      user_first_name: user.firstName,
      user_last_name: user.lastName
    }
  }
  
}