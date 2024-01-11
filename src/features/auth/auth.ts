import { getDB } from "~/database/getDB";
import { createApp } from "~/utils/createApp";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { GoogleOauthService } from "./oauth/google.service";

export const authRoutes = createApp<{ authService: AuthService }>();

authRoutes.use("*", async (c, next) => {
  const authKey = {
    google: {
      clientId: c.env.GOOGLE_CLIENT_ID,
      clientSecret: c.env.GOOGLE_CLIENT_SECRET,
      redirectUrl: c.env.GOOGLE_REDIRECT_URL,
    },
  };
  const db = getDB(c.env);
  const authRepository = new AuthRepository(db);
  const authService = new AuthService(authRepository);

  c.set("authService", authService);
  await next();
});

authRoutes.get("/google", async (c) => {
  const googleOauthService = new GoogleOauthService({
    clientId: c.env.GOOGLE_CLIENT_ID,
    clientSecret: c.env.GOOGLE_CLIENT_SECRET,
    redirectUrl: c.env.GOOGLE_REDIRECT_URL,
  });
  const redirectUrl = await googleOauthService.getGoogleRedirectUrl();

  return c.redirect(redirectUrl, 302);
});
