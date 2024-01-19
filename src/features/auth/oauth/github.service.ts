import { github } from "worker-auth-providers";
import { GoogleUser } from "../auth.types";

export class GithubOauthService {
  constructor(
    private authKey: {
      clientId: string;
      clientSecret: string;
      redirectUrl: string;
    }
  ) {}

  getGithubRedirectUrl = async () => {
    return await github.redirect({
      options: {
        clientId: this.authKey.clientId,
        redirectTo: this.authKey.redirectUrl,
      },
    });
  };

  getGithubUser = async (request: Request) => {
    console.log(request, this.authKey);

    const { user }: { user: GoogleUser } = await github.users({
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
