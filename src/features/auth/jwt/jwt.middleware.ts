import { createFactory } from "hono/factory";

import { Middleware } from "~/types/app";
import { ApiError } from "~/utils/ApiError";
import { JwtService } from "./jwt.service";

type AuthMiddleware = Middleware<{ userId: number }>;

const factory = createFactory();

export const checkAccessToken = factory.createMiddleware(async (c, next) => {
  const jwtService = new JwtService({
    access_secret: c.env.AUTH_JWT_SECRET,
    refresh_secret: c.env.AUTH_REFRESH_JWT_SECRET,
  });
  const accessToken = c.req.header("Authorization")?.split(" ")[1];
  if (!accessToken) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
  try {
    const payload = await jwtService.verifyAccessToken(accessToken);
    c.set("userId", payload.id);
    await next();
  } catch (e) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
});

export const checkRefreshToken: AuthMiddleware = async (c, next) => {
  const jwtService = new JwtService({
    access_secret: c.env.AUTH_JWT_SECRET,
    refresh_secret: c.env.AUTH_REFRESH_JWT_SECRET,
  });
  const refreshToken = c.req.header("Authorization")?.split(" ")[1];
  if (!refreshToken) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
  try {
    const payload = await jwtService.verifyRefreshToken(refreshToken);
    c.set("userId", payload.id);
    await next();
  } catch (e) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
};
