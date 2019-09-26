
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { userRepo } from "../../repos";

const createUserUseCase = new CreateUserUseCase(userRepo);
const createUserController = new CreateUserController(
  createUserUseCase
)

export {
  createUserUseCase,
  createUserController
}