
import { RegisterWithFacebookErrors } from "./RegisterWithFacebookErrors";
import { Either, left, Result, right } from "../../../../core/logic/Result";
import { UseCase } from "../../../../core/domain/UseCase";
import { IUserRepo } from "../../repos/userRepo";
import { IFacebookService } from "../../services/authProviders/providers/facebookProvider";
import { User } from "../../domain/user";
import { AuthProviderProfileInfo } from "../../services/authProviders/models/authProviderProfileInfo";
import { GenericAppError } from "../../../../core/logic/AppError";
import { UserEmail } from "../../domain/userEmail";

type Response = Either<
  RegisterWithFacebookErrors.FacebookTokenNotGenuine | 
  RegisterWithFacebookErrors.FetchAccountDetailsError, 
  Result<void>
>;

interface RegisterWithFacebookRequest {
  fbUserId: number;
  fbAuthToken: string;
  referralCode?: string;
}

export class RegisterWithFacebook implements UseCase<RegisterWithFacebookRequest, Promise<Response>> {
  
  private userRepo: IUserRepo;
  private facebookService: IFacebookService;

  constructor (userRepo: IUserRepo, facebookService: IFacebookService) {
    this.userRepo =  userRepo;
    this.facebookService = facebookService;
  }
  
  async execute (request: RegisterWithFacebookRequest): Promise<Response> {
    let user: User;
    const { fbAuthToken, fbUserId } = request

    const isTokenValid = await this.facebookService.checkValidAuthToken(fbAuthToken, fbUserId);
    
    if (!isTokenValid) {
      return left(new RegisterWithFacebookErrors.FacebookTokenNotGenuine(fbAuthToken)) as Response;
    }

    let fbProfileInfo: AuthProviderProfileInfo;

    try {
      fbProfileInfo = await this.facebookService.getProfileInfo(fbAuthToken, fbUserId);
    } catch (err) {
      return left(new RegisterWithFacebookErrors.FetchAccountDetailsError()) as Response
    }

    const email = UserEmail.create(fbProfileInfo.userEmail).getValue()

    // If the user already exists, just log 'em in.
    const alreadyCreatedUser = await this.userRepo.findUserByEmail(email);
    if (alreadyCreatedUser) {
      user = alreadyCreatedUser;
    } 
    
    else {
      // We're good. Create the user.
      const userOrError: Result<User> = User.create({ 
        facebookId: fbUserId,
        email: email,
        password: null,
        isEmailVerified: true,
        firstName: fbProfileInfo.fullName.split(" ")[0],
        lastName: fbProfileInfo.fullName.split(" ")[1],
        profilePicture: fbProfileInfo.profilePictureUrl
      });

      if (userOrError.isFailure) {
        return left(new GenericAppError.UnexpectedError(userOrError.error)) as Response
      }

      user = userOrError.getValue();
    }

    await this.userRepo.save(user);

    return right(Result.ok<void>()) as Response; 
  }

}