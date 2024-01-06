import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

const todoScheme = z.object({
  id: z.number(),
  title: z.string(),
  checked: z.boolean(),
});

export const todosDocRoutes = [
  // GET /todos
  createRoute({
    method: "get",
    path: "/todos",
    tags: ["todos"],
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
        description: "Todo 배열 반환",
      },
    },
  }),

  // GET /todos/:id
  createRoute({
    method: "get",
    path: "/todos/{id}",
    tags: ["todos"],
    summary: "todo 조회",
    description: "todo 조회",
    request: {
      params: z.object({
        id: z.number(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: todoScheme,
          },
        },
        description: "todo 반환",
      },
    },
  }),

  // POST /todos
  createRoute({
    method: "post",
    path: "/todos",
    tags: ["todos"],
    summary: "todo 추가",
    description: "todo 추가",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              title: z.string().openapi({ default: "책읽기" }),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: todoScheme,
          },
        },
        description: "정상 추가",
      },
    },
  }),

  // PUT /todos/:id
  createRoute({
    method: "put",
    path: "/todos/{id}",
    tags: ["todos"],
    summary: "todo 수정",
    description: "todo 수정",
    request: {
      params: z.object({
        id: z.number(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: todoScheme,
          },
        },
        description: "정상 수정",
      },
    },
  }),

  // DELETE /todos/:id
  createRoute({
    method: "delete",
    path: "/todos/{id}",
    tags: ["todos"],
    summary: "todo 삭제",
    description: "todo 삭제",
    request: {
      params: z.object({
        id: z.number(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: {},
          },
        },
        description: "정상 삭제",
      },
    },
  }),
];
