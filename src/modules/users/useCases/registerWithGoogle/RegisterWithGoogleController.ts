
import { RegisterWithGoogle } from "./RegisterWithGoogle";
import { RegisterWithGoogleErrors } from "./RegisterWithGoogleErrors";
import { BaseController } from "../../../../core/infra/BaseController";

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

      return this.ok(this.res);
    }
  }
}