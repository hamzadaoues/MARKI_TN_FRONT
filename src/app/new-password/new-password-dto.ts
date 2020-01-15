export class NewPasswordDto {
  password: string;
  token: string;

  constructor(password, token) {
    this.password = password;
    this.token = token;
  }

}
