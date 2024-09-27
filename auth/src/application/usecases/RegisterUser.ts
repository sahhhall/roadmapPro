import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class RegisterUser {
  constructor(private userRepository: IUserRepository) { }

   async execute({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<User> {

    const user = new User(
      name,
      email,
      password,
      role
    );

    return await this.userRepository.create(user);
  }
}