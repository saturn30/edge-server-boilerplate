import { decode, sign, verify } from "hono/jwt";

import { AuthRepository } from "./auth.repository";
import { OauthProviders } from "./auth.types";

export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtSecret: {
      access: string;
      refresh: string;
    }
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

    return await this.createToken(user.id);
  };

  createToken = async (id: number) => {
    return {
      access_token: await sign(
        { id, exp: Date.now() + 24 * 60 * 60 * 1000 },
        this.jwtSecret.access
      ),
      refresh_token: await sign(
        { id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 },
        this.jwtSecret.refresh
      ),
    };
  };
}
