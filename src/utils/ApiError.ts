import { HTTPException } from "hono/http-exception";

export class ApiError extends HTTPException {
  constructor(status: number, data?: object | string) {
    super(
      status,
      data
        ? {
            res: new Response(JSON.stringify(data), {
              headers: { "Content-Type": "application/json" },
            }),
          }
        : undefined
    );
  }
}
