
import { BaseController } from "../../../../../infra/http/BaseController";
import { RegisterWithGoogle } from "./RegisterWithGoogle";
import { RegisterWithGoogleErrors } from "./RegisterWithGoogleErrors";
import { JWTToken } from "../../../services/jwtClient";
import { AccessTokenDTO } from "../../../dtos/AccessTokenDTO";

export class RegisterWithGoogleController extends BaseController {
  private useCase: RegisterWithGoogle;

  constructor (useCase: RegisterWithGoogle) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl (): Promise<any> {
    const { googleAuthToken, referralCode } = this.req.body;

    const result = await this.useCase.execute({
      googleAuthToken, referralCode
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case RegisterWithGoogleErrors.GoogleTokenNotGenuine:
          return this.unauthorized(error.errorValue().message)
        case RegisterWithGoogleErrors.FetchAccountDetailsError:
          return this.unauthorized(error.errorValue().message);
        default:
          return this.fail(error.errorValue().message);
      }
    } else {

      const token = result.value as JWTToken;

      return this.ok<AccessTokenDTO>(this.res, {
        token
      });
    }
  }
}