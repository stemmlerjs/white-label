
import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace CreateUserErrors {

  export class AccountAlreadyExists extends Result<UseCaseError> {    
    constructor (email: string) {
      super(false, {
        message: `The email ${email} associated for this account already exists`
      } as UseCaseError)
    }
  }

  export class FacebookTokenInvalid extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `The facebook token used to attempt to create an account not genuine.`
      } as UseCaseError)
    } 
  }

  export class GoogleTokenInvalid extends Result<UseCaseError> {
    constructor () {
      super(false, {
        message: `The google token used to attempt to create an account not genuine.`
      } as UseCaseError)
    } 
  }

}