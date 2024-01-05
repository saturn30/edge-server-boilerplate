import { Hono } from "hono";
import { Bindings } from "../types/app";
import { Variables } from "hono/types";

export const createApp = <T extends Variables>() => {
	return new Hono<{ Bindings: Bindings; Variables: T }>();
};
