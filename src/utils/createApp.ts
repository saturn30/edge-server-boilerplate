import { Hono } from "hono";
import { Variables } from "hono/types";

import { Bindings } from "~/types/app";

export const createApp = <T extends Variables>() => {
  return new Hono<{ Bindings: Bindings; Variables: T & { userId: number } }>(); // 매번 타입 설정이 귀찮으므로 userId는 전역으로 설정함.
};
