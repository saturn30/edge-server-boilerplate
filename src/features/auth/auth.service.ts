import { google } from "worker-auth-providers";
import { GoogleUser } from "./auth.types";

export class AuthService {
  constructor(
    private authKey: {
      google: {
        clientId: string;
        clientSecret: string;
        redirectUrl: string;
      };
    }
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
}
