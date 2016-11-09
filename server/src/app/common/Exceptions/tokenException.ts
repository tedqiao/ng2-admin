export class tokenException extends Error {

  public name;
  public message;

  constructor() {
    super();
    this.name = 'token';
    this.message = 'can not find token';
  }

}

