export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export type OauthProviders = "google" | "github";
