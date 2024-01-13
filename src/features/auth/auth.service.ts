import { AuthRepository } from "./auth.repository";
import { OauthProviders } from "./auth.types";
import { JwtService } from "./jwt/jwt.service";

export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService
  ) {}

  login = async ({
    provider,
    providerId,
  }: {
    provider: OauthProviders;
    providerId: string;
  }) => {
    const user = await this.authRepository.findOne({ provider, providerId });
    if (!user) {
      return await this.authRepository.insert({ provider, providerId });
    }

    return await this.jwtService.createToken(user.id);
  };
}
