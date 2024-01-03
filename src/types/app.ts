import { Context as HonoContext, MiddlewareHandler } from "hono";

export type Bindings = {
  DB_AUTH_TOKEN: string;
  DATABASE_URL: string;
};

export type Context = HonoContext<{
  Bindings: Bindings;
}>;

export type Middleware = MiddlewareHandler<{ Bindings: Bindings }>;
