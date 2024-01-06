import { Hono } from "hono";
import { Variables } from "hono/types";

import { Bindings } from "~/types/app";

export const createApp = <T extends Variables>() => {
  return new Hono<{ Bindings: Bindings; Variables: T }>();
};
