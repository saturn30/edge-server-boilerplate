import { google } from "worker-auth-providers";
import { AuthRepository } from "./auth.repository";
import { GoogleUser, OauthProviders } from "./auth.types";

export class AuthService {
  constructor(
    private authKey: {
      google: {
        clientId: string;
        clientSecret: string;
        redirectUrl: string;
      };
    },
    private authRepository: AuthRepository
  ) {}

  getGoogleRedirectUrl = async () => {
    return await google.redirect({
      options: {
        clientId: this.authKey.google.clientId,
        redirectTo: this.authKey.google.redirectUrl,
      },
    });
  };

  getGoogleUser = async (request: Request) => {
    const { user }: { user: GoogleUser } = await google.users({
      options: {
        clientId: this.authKey.google.clientId,
        clientSecret: this.authKey.google.clientSecret,
        redirectUrl: this.authKey.google.redirectUrl,
      },
      request,
    });

    return { user };
  };

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
