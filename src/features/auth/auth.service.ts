import { AuthRepository } from "./auth.repository";
import { OauthProviders } from "./auth.types";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  login = async ({
    provider,
    providerId,
  }: {
    provider: OauthProviders;
    providerId: string;
  }) => {
    const user = this.authRepository.findOne({ provider, providerId });
    if (!user) {
      return this.authRepository.insert({ provider, providerId });
    }
    return user;
  };
}
