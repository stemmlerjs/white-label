
import { Either, Result, left, right } from "./core/Result";
import { UseCase } from "./core/domain/UseCase";
import { BaseController } from "./core/infra/BaseController";
import { ValueObject } from "./core/domain/ValueObject";

/**
 * Resources
 * ============================
 * 
 * https://medium.com/inato/expressive-error-handling-in-typescript-and-benefits-for-domain-driven-design-70726e061c86
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html
 * https://stackoverflow.com/questions/12739149/typescript-type-signatures-for-functions-with-variable-argument-counts
 * https://www.typescriptlang.org/docs/handbook/namespaces.html
 * https://dev.to/_gdelgado/type-safe-error-handling-in-typescript-1p4n
 * https://stackoverflow.com/questions/36332665/how-to-use-instanceof-in-a-switch-statement
 */

interface DomainError {
  message: string;
  error?: any;
}

/**
 * @desc General application errors (few of these as possible)
 * @http 500
 */

export namespace AppError {
  export class UnexpectedError extends Result<DomainError> {
    public constructor (err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err
      })
    }

    public static create (err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}

export namespace CreateUserError {

  export class UsernameTakenError extends Result<DomainError> {    
    public constructor (username: string) {
      super(false, {
        message: `The username "${username}" has already been taken.`
      })
    }

    public static create (username: string): UsernameTakenError {
      return new UsernameTakenError(username);
    }
  }

  export class EmailInvalidError extends Result<DomainError> {    
    public constructor (email: string) {
      super(false, {
        message: `The email "${email}" is invalid.`
      })
    }

    public static create (email: string): EmailInvalidError {
      return new EmailInvalidError(email);
    }
  }

  export class AccountAlreadyExistsError extends Result<DomainError> {    
    public constructor () {
      super(false, {
        message: `The account associated with this email already exists.`
      })
    }

    public static create (): AccountAlreadyExistsError {
      return new AccountAlreadyExistsError();
    }
  }

  export class InsecurePasswordError extends Result<DomainError> {    
    public constructor () {
      super(false, {
        message: `The password provided wasn't up to security standards.`
      })
    }

    public static create (): InsecurePasswordError {
      return new InsecurePasswordError();
    }
  }
}

interface Request {
  username: string;
  email: string;
  password: string;
}

interface EmailProps {
  email: string;
}

export class Email extends ValueObject<EmailProps> {

  get value (): string {
    return this.props.email
  }

  private constructor (props: EmailProps) {
    super(props);
  }

  private static isEmailValid (email: string): boolean {
    // Naive validation
    if (email.indexOf('.com') === -1) {
      return false;
    } else {
      return true;
    }
  }

  public static create (props: EmailProps): Either<CreateUserError.EmailInvalidError, Result<Email>> {
    if (this.isEmailValid(props.email)) {
      return right(Result.ok<Email>(new Email(props)));
    } else {
      return left(CreateUserError.EmailInvalidError.create(props.email));
    }
  }
}

interface PasswordProps {
  password: string;
}

export class Password extends ValueObject<PasswordProps> {

  get value (): string {
    return this.props.password
  }

  private constructor (props: PasswordProps) {
    super(props);
  }

  private static isPasswordValid (password: string): boolean {
    // Naive validation
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  }

  public static create (props: PasswordProps): Either<CreateUserError.InsecurePasswordError, Result<Password>> {
    if (this.isPasswordValid(props.password)) {
      return right(Result.ok<Password>(new Password(props)));
    } else {
      return left(CreateUserError.InsecurePasswordError.create());
    }
  }
}

interface User {}

interface IUserRepo {
  getUserByUsername(username: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}

type Response = Either<
  CreateUserError.UsernameTakenError | 
  CreateUserError.EmailInvalidError | 
  CreateUserError.AccountAlreadyExistsError |
  CreateUserError.InsecurePasswordError
  , 
  Result<any> // OK 
>

class CreateUserUseCase implements UseCase<Request, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor (userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute (request: Request): Promise<Response> {

    const { username, email, password } = request;

    const [userByUsername, userByEmail] = await Promise.all([
      this.userRepo.getUserByUsername(username),
      this.userRepo.getUserByEmail(email),
    ])

    const usernameTaken = !!userByUsername === true;
    const accountCreated = !!userByEmail === true;

    if (usernameTaken) {
      return left(CreateUserError.UsernameTakenError.call(username));
    }

    if (accountCreated) {
      return left(CreateUserError.EmailInvalidError.call(email));
    }

    const emailOrError = Email.create({ email })

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const passwordOrError = Password.create({ password });

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    return right(Result.ok())
  }
}


class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor (useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (): Promise<any> {
    const { username, email, password } = this.req.body;

    try {
      const result = await this.useCase.execute({ username, email, password });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateUserError.UsernameTakenError:
            return this.conflict(error.getValue().message)
          case CreateUserError.EmailInvalidError:
            return this.clientError(error.getValue().message);
          case CreateUserError.AccountAlreadyExistsError:
            return this.conflict(error.getValue().message);
          case CreateUserError.InsecurePasswordError:
            return this.clientError(error.getValue().message);
          default:
            return this.fail(error.getValue().message);
        }
      } else {
        return this.ok(this.res);
      }
    } 
    
    catch (err) {
      return this.fail(err);
    }
  }
}