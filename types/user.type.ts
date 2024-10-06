export enum UserRole {
  ADMIN = "ADMIN",
}

export type IUser = {
  id: string;
  name: string;
  role: UserRole;
};

