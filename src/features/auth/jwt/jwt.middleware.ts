import { Middleware } from "~/types/app";
import { ApiError } from "~/utils/ApiError";
import { JwtService } from "./jwt.service";

export const checkAccessToken: Middleware = async (c, next) => {
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
    next();
  } catch (e) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
};

export const checkRefreshToken: Middleware = async (c, next) => {
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
    next();
  } catch (e) {
    throw new ApiError(401, { message: "Unauthorized" });
  }
};
