import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const todoScheme = z.object({
  id: z.number(),
  title: z.string(),
  checked: z.boolean(),
});

export const route = createRoute({
  method: "get",
  path: "/todos",
  tags: ["todo"],
  summary: "todo 전체 조회",
  description: "todo 전체 조회",
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: todoScheme,
        },
      },
      description: "Retrieve the user",
    },
  },
});
