export type ILoginRes = {
  status: boolean;
  message: string;
  jwt: string;
  expired: string;
  jwtRefreshToken: string;
  userId: number;
};

