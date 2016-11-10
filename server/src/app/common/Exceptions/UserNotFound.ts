export class UserNotFoundException extends Error {

  public name;
  public message;

  constructor() {
    super();
    this.name = "UserNotFound";
    this.message = "user not found!";
  }

}
