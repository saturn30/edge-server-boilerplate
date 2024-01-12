import { getDB } from "~/database/getDB";
import { createApp } from "~/utils/createApp";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { GoogleOauthService } from "./oauth/google.service";

export const authRoutes = createApp<{
  authService: AuthService;
  googleOauthService: GoogleOauthService;
}>();

authRoutes.use("*", async (c, next) => {
  const db = getDB(c.env);
  const authRepository = new AuthRepository(db);
  const authService = new AuthService(authRepository, {
    access: c.env.AUTH_JWT_SECRET,
    refresh: c.env.AUTH_REFRESH_JWT_SECRET,
  });

  c.set("authService", authService);
  c.set(
    "googleOauthService",
    new GoogleOauthService({
      clientId: c.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: c.env.AUTH_GOOGLE_CLIENT_SECRET,
      redirectUrl: `${c.env.SERVER_URL}/auth/google/redirect`,
    })
  );
  await next();
});

authRoutes.get("/google", async (c) => {
  const googleOauthService = c.get("googleOauthService");
  const redirectUrl = await googleOauthService.getGoogleRedirectUrl();

  return c.redirect(redirectUrl, 302);
});

authRoutes.get("/google/redirect", async (c) => {
  const googleOauthService = c.get("googleOauthService");
  const authService = c.get("authService");

  const { user } = await googleOauthService.getGoogleUser(c.req.raw.clone());
  const tokens = await authService.login({
    provider: "google",
    providerId: user.id,
  });
  return c.json(tokens);
});
