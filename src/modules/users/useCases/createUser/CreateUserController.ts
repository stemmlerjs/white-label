
import { BaseController } from "../../../../core/infra/BaseController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserErrors } from "./CreateUserErrors";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor (useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const dto: CreateUserDTO = this.req.body as CreateUserDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case CreateUserErrors.AccountAlreadyExists:
            return this.conflict(error.errorValue().message)
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res);
      }

    } catch (err) {
      return this.fail(err)
    }
  }
}