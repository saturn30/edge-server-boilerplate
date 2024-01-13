import { Context as HonoContext, MiddlewareHandler } from "hono";
import { Variables } from "hono/types";

export type Bindings = {
  DB_AUTH_TOKEN: string;
  DB_URL: string;
  SERVER_URL: string;

  AUTH_GOOGLE_CLIENT_ID: string;
  AUTH_GOOGLE_CLIENT_SECRET: string;

  AUTH_JWT_SECRET: string;
  AUTH_REFRESH_JWT_SECRET: string;
};

export type Context = HonoContext<{
  Bindings: Bindings;
}>;

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Middleware<T extends Variables = {}> = MiddlewareHandler<{
  Bindings: Bindings;
  Variables: T;
}>;
