import { sign, verify } from "hono/jwt";

export class JwtService {
  constructor(
    private config: {
      access_secret: string;
      refresh_secret: string;
    }
  ) {}

  createToken = async (id: number) => {
    return {
      access_token: await sign(
        { id, exp: Date.now() + 24 * 60 * 60 * 1000 },
        this.config.access_secret
      ),
      refresh_token: await sign(
        { id, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 },
        this.config.refresh_secret
      ),
    };
  };

  verifyAccessToken = async (token: string) => {
    return verify(token, this.config.access_secret);
  };

  verifyRefreshToken = async (token: string) => {
    return await verify(token, this.config.refresh_secret);
  };
}
