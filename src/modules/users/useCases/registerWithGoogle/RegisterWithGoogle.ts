
import { RegisterWithGoogleErrors } from "./RegisterWithGoogleErrors";
import { left, Either, Result, right } from "../../../../core/logic/Result";
import { UseCase } from "../../../../core/domain/UseCase";
import { IUserRepo } from "../../repos/userRepo";
import { UserEmail } from "../../domain/userEmail";
import { GenericAppError } from "../../../../core/logic/AppError";
import { User } from "../../domain/user";
import { AuthProviderProfileInfo } from "../../services/authProviders/models/authProviderProfileInfo";
import { IGoogleService } from "../../services/authProviders/providers/googleProvider";

type RegisterWithGoogleResponse = Either<
  RegisterWithGoogleErrors.GoogleTokenNotGenuine | 
  RegisterWithGoogleErrors.FetchAccountDetailsError, 
  Result<void>
>;

interface Request {
  googleAuthToken: string;
  referralCode?: string;
}

export class RegisterWithGoogle implements UseCase<Request, Promise<RegisterWithGoogleResponse>> {
  
  private userRepo: IUserRepo;
  private googleService: IGoogleService;

  constructor (userRepo: IUserRepo, googleService: IGoogleService) {
    this.userRepo =  userRepo;
    this.googleService = googleService;
  }
  
  async execute (request: Request): Promise<RegisterWithGoogleResponse> {
    let user: User;
    const { googleAuthToken } = request

    const isTokenValid = await this.googleService.checkValidAuthToken(googleAuthToken);
    
    if (!isTokenValid) {
      return left(new RegisterWithGoogleErrors.GoogleTokenNotGenuine(googleAuthToken)) as RegisterWithGoogleResponse
    }

    let googleProfileInfo: AuthProviderProfileInfo;

    try {
      googleProfileInfo = await this.googleService.getProfileInfo(googleAuthToken);
    } catch (err) {
      return left(new RegisterWithGoogleErrors.FetchAccountDetailsError()) as RegisterWithGoogleResponse
    }

    const userEmail = UserEmail.create(googleProfileInfo.userEmail).getValue();

    // If the user already exists, just log 'em in.
    const alreadyCreatedUser = await this.userRepo.findUserByEmail(userEmail);
    
    if (alreadyCreatedUser) {
      user = alreadyCreatedUser;
    } 
    
    else {
      // We're good. Create the user.
      const userOrError: Result<User> = User.create({ 
        googleId: googleProfileInfo.userId,
        email: userEmail,
        password: null,
        isEmailVerified: true,
        firstName: googleProfileInfo.firstName,
        lastName: googleProfileInfo.lastName,
        profilePicture: googleProfileInfo.profilePictureUrl
      });

      if (userOrError.isFailure) {
        return left(new GenericAppError.UnexpectedError(userOrError.error)) as RegisterWithGoogleResponse
      }

      user = userOrError.getValue();
    }

    await this.userRepo.save(user);

    return right(Result.ok<void>()) as RegisterWithGoogleResponse; 
  }

}