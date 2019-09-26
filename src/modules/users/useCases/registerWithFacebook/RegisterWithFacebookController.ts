
import { RegisterWithFacebook } from "./RegisterWithFacebook";
import { RegisterWithFacebookErrors } from "./RegisterWithFacebookErrors";
import { BaseController } from "../../../../core/infra/BaseController";

export class RegisterWithFacebookController extends BaseController {
  private useCase: RegisterWithFacebook;

  constructor (useCase: RegisterWithFacebook) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl (): Promise<any> {
    const { fbUserId, fbAuthToken, referralCode } = this.req.body;

    if (!!fbUserId === false) {
      return this.clientError("Must profile 'fbUserId'")
    }

    if (!!fbAuthToken === false) {
      return this.clientError("Must profile 'fbAuthToken'")
    }
    
    const result = await this.useCase.execute({
      fbUserId, fbAuthToken, referralCode
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case RegisterWithFacebookErrors.FacebookTokenNotGenuine:
          return this.unauthorized(error.errorValue().message)
        case RegisterWithFacebookErrors.FetchAccountDetailsError:
          return this.unauthorized(error.errorValue().message);
        default:
          return this.fail(error.errorValue().message);
      }
    } else {

      return this.ok(this.res);
    }
  }
}