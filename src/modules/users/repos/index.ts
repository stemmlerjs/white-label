
import { UserRepo } from "./userRepo";
import models from "../../../infra/sequelize/models";

const userRepo = new UserRepo(models);

export {
  userRepo
}