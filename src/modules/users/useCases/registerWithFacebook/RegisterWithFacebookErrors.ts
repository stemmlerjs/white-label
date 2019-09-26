

import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace RegisterWithFacebookErrors {

  export class FacebookTokenNotGenuine extends Result<UseCaseError> {
    constructor (token: string) {
      super(false, { 
        message: `Facebook token invalid= ${token}`
      } as UseCaseError)
    }
  }

  export class FetchAccountDetailsError extends Result<UseCaseError> {
    constructor () {
      super(false, { 
        message: "Failed to fetch Facebook account details"
      } as UseCaseError)
    }
  }

}