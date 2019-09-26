import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Guard } from "../../../core/logic/Guard";
import { UserCreatedEvent } from "./events/userCreatedEvent";
import { UserPassword } from "./userPassword";

interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  isEmailVerified: boolean;
  profilePicture?: string;
  googleId?: number;
  facebookId?: number;
  username?: string;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get isEmailVerified (): boolean {
    return this.props.isEmailVerified;
  }

  get profilePicture (): string {
    return this.props.profilePicture;
  }

  get googleId (): number {
    return this.props.googleId;
  }

  get facebookId (): number {
    return this.props.facebookId;
  }

  get username (): string {
    return this.props.username;
  }
  
  set username (value: string) {
    this.props.username = value;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private static isRegisteringWithGoogle (props: UserProps): boolean {
    return !!props.googleId === true;
  }

  private static isRegisteringWithFacebook (props: UserProps): boolean {
    return !!props.facebookId === true;
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.isEmailVerified, argumentName: 'isEmailVerified' }
    ];

    if (!this.isRegisteringWithGoogle(props) && !this.isRegisteringWithFacebook(props) ) {
      guardedProps.push({ argument: props.password, argumentName: 'password' })
    }

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    } 
    
    else {
      const user = new User({
        ...props,
        username: props.username ? props.username : '',
      }, id);

      const idWasProvided = !!id;

      if (!idWasProvided) {
        user.addDomainEvent(new UserCreatedEvent(user));
      }

      return Result.ok<User>(user);
    }
  }
}