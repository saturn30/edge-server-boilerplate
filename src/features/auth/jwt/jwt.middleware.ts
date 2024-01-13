import { Middleware } from "~/types/app";
import { ApiError } from "~/utils/ApiError";
import { JwtService } from "./jwt.service";

type AuthMiddleware = Middleware<{ userId: number }>;

export const checkAccessToken: AuthMiddleware = async (c, next) => {
  const jwtService = new JwtService({
    access_secret: c.env.AUTH_JWT_SECRET,
    refresh_secret: c.env.AUTH_REFRESH_JWT_SECRET,
  });
  const authorization = c.req.header("Authorization");
  if (!authorization) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
  try {
    const payload = await jwtService.verifyAccessToken(authorization);
    c.set("userId", payload.id);
    next();
  } catch (e) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
};

export const checkRefreshToken: AuthMiddleware = async (c, next) => {
  const jwtService = new JwtService({
    access_secret: c.env.AUTH_JWT_SECRET,
    refresh_secret: c.env.AUTH_REFRESH_JWT_SECRET,
  });
  const authorization = c.req.header("Authorization");
  if (!authorization) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
  try {
    const payload = await jwtService.verifyRefreshToken(authorization);
    c.set("userId", payload.id);
    next();
  } catch (e) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
};
