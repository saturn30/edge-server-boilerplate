import { Hono } from "hono";
import { Bindings } from "../types/app";

export const createApp = () => {
  return new Hono<{ Bindings: Bindings }>();
};
