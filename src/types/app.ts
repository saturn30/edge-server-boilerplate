import { Context as HonoContext, MiddlewareHandler } from "hono";

export type Bindings = {
  DB_AUTH_TOKEN: string;
  DB_URL: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URL: string;
};

export type Context = HonoContext<{
  Bindings: Bindings;
}>;

export type Middleware = MiddlewareHandler<{ Bindings: Bindings }>;
