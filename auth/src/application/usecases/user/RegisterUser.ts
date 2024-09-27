import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class RegisterUser {
  constructor(private userRepository: IUserRepository) { }

   async execute({
    name,
    email,
    password,
    avatar = "https://res.cloudinary.com/dgvcq2pqp/image/upload/v1721892963/r9jiss1giwn3p14ck81h.jpg"
  }: {
    name: string;
    email: string;
    password: string;
    avatar?: string
  }): Promise<User> {

    const user = new User(
      name,
      email,
      password,
      avatar 
    );

    return await this.userRepository.create(user);
  }
}