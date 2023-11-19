export type Payload = {
  sub: number;
  username: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
};
