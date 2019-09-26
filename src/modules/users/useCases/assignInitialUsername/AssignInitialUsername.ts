
import { UseCase } from "../../../../core/domain/UseCase";
import { User } from "../../domain/user";
import { Result } from "../../../../core/logic/Result";
import { IUserRepo } from "../../repos/userRepo";

interface Request {
  user: User;
}

type Response = Result<void>;

export class AssignInitialUsername implements UseCase<Request, Promise<Response>> {
  private userRepo: IUserRepo;
  
  constructor (userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute (request: Request): Promise<Response> {
    const { user } = request;

    const baseUsername = `${user.firstName}${user.lastName}`;
    let index = 1;
    let runningUsername = baseUsername;
    let isUniqueUsername = false;

    try {
      while (!isUniqueUsername) {
        const found = await this.userRepo.findUserByUsername(runningUsername);
        if (!found) {
          isUniqueUsername = true;
        } else {
          runningUsername = `${baseUsername}${index}`;
          index++;
        }
      }
  
      user.username = runningUsername;
  
      await this.userRepo.save(user);
      console.log(`[AssignInitialUsername]: Assigned the name ${user.username} to ${user.firstName} ${user.lastName}`)
      return Result.ok();
    } catch (err) {
      return Result.fail(err);
    }
  }
}