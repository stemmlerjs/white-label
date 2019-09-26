
import { Result } from "../../../../../core/result";
import { DomainError } from "../../../../../core/domainError";

export namespace RegisterWithGoogleErrors {

  export class GoogleTokenNotGenuine extends Result<DomainError> {
    constructor (token: string) {
      super(false, { 
        message: `Google token invalid= ${token}`
      } as DomainError)
    }
  }

  export class FetchAccountDetailsError extends Result<DomainError> {
    constructor () {
      super(false, { 
        message: "Failed to fetch Google account details"
      } as DomainError)
    }
  }

}