import { google } from "worker-auth-providers";
import { GoogleUser } from "../auth.types";

export class GoogleOauthService {
  constructor(
    private authKey: {
      clientId: string;
      clientSecret: string;
      redirectUrl: string;
    }
  ) {}

  getGoogleRedirectUrl = async () => {
    return await google.redirect({
      options: {
        clientId: this.authKey.clientId,
        redirectTo: this.authKey.redirectUrl,
      },
    });
  };

  getGoogleUser = async (request: Request) => {
    const { user }: { user: GoogleUser } = await google.users({
      options: {
        clientId: this.authKey.clientId,
        clientSecret: this.authKey.clientSecret,
        redirectUrl: this.authKey.redirectUrl,
      },
      request,
    });

    return { user };
  };
}
