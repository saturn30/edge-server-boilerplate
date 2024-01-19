import { getDB } from "~/database/getDB";
import { createApp } from "~/utils/createApp";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { checkAccessToken } from "./jwt/jwt.middleware";
import { JwtService } from "./jwt/jwt.service";
import { GithubOauthService } from "./oauth/github.service";
import { GoogleOauthService } from "./oauth/google.service";

export const authRoutes = createApp<{
  authService: AuthService;
  googleOauthService: GoogleOauthService;
  githubOauthService: GithubOauthService;
}>();

authRoutes.use("*", async (c, next) => {
  const db = getDB(c.env);
  const authRepository = new AuthRepository(db);
  const jwtService = new JwtService({
    access_secret: c.env.AUTH_JWT_SECRET,
    refresh_secret: c.env.AUTH_REFRESH_JWT_SECRET,
  });
  const authService = new AuthService(authRepository, jwtService);

  c.set("authService", authService);
  c.set(
    "googleOauthService",
    new GoogleOauthService({
      clientId: c.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: c.env.AUTH_GOOGLE_CLIENT_SECRET,
      redirectUrl: `${c.env.SERVER_URL}/auth/google/redirect`,
    })
  );
  c.set(
    "githubOauthService",
    new GithubOauthService({
      clientId: c.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: c.env.AUTH_GITHUB_CLIENT_SECRET,
      redirectUrl: `${c.env.SERVER_URL}/auth/github/redirect`,
    })
  );
  await next();
});

authRoutes.get("/me", checkAccessToken, async (c) => {
  const authService = c.get("authService");
  const userId = c.get("userId");

  const user = await authService.getUserById(userId);
  return c.json(user);
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

authRoutes.get("/github", async (c) => {
  const githubOauthService = c.get("githubOauthService");
  const redirectUrl = await githubOauthService.getGithubRedirectUrl();

  return c.redirect(redirectUrl, 302);
});

authRoutes.get("/github/redirect", async (c) => {
  const githubOauthService = c.get("githubOauthService");
  const authService = c.get("authService");

  const { user } = await githubOauthService.getGithubUser(c.req.raw.clone());
  const tokens = await authService.login({
    provider: "github",
    providerId: user.id,
  });
  return c.json(tokens);
});
