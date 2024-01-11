import { DB } from "~/database/getDB";
import { users } from "~/database/schemas/user";
import { OauthProviders } from "./auth.types";

export class AuthRepository {
  constructor(private db: DB) {}

  findOne = ({
    provider,
    providerId,
  }: {
    provider: OauthProviders;
    providerId: string;
  }) => {
    return this.db.query.users.findFirst({
      where: (users, { eq }) =>
        eq(users.provider, provider) && eq(users.providerId, providerId),
    });
  };

  insert = ({
    provider,
    providerId,
  }: {
    provider: OauthProviders;
    providerId: string;
  }) => {
    return this.db.insert(users).values({ provider, providerId }).returning();
  };
}
