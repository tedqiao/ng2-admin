import BaseRepository = require("../../common/BaseRepository");
import User = require("./user.schema");
import {IUser} from "../../model/interfaces/IUser";


class UserRepository extends BaseRepository<IUser> {

  constructor() {
    super(User);
  }

}

Object.seal(UserRepository);
export = UserRepository;
