import { google } from "worker-auth-providers";

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
}
