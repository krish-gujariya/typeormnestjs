export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class FindUser {
  email: string;
  password: string;
}
