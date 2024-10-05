import { User } from "../../../domain/entities/User";
import { ITokenService } from "../../../domain/interfaces/ITokenService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { Password } from "../../services/PasswordHash";

export interface LoginResult {
  success: boolean;
  data?: {
    admin: User;
    accessToken: string;
    refreshToken: string;
  };
  error?: {
    message: string;
  };
}

export class LoginAdmin {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: ITokenService
  ) {}

  async execute({
    email,
    password
  }: Pick<User, "email" | "password">): Promise<LoginResult> {
    const admin = await this.userRepository.findByEmail(email);

    if (!admin || !admin.isAdmin) {
      return {
        success: false,
        error: {
          message: 'not an admin'
        }
      };
    }

    const passwordMatches = await Password.compare(password, admin.password);
    if (!passwordMatches) {
      return {
        success: false,
        error: {
          message: 'Incorrect password'
        }
      };
    }

    const accessToken = this.jwtService.generateAccessToken(admin);
    const refreshToken = this.jwtService.generateRefreshToken(admin);

    return {
      success: true,
      data: {
        admin,
        accessToken,
        refreshToken
      }
    };
  }
}