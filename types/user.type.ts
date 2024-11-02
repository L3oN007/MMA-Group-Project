export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  USER = "USER",
}

export type IUser = {
  id: number;
  fullName: string;
  unsignFullName: string;
  imageUrl: string;
  roleName: UserRole;
  address: string;
  isActive: boolean;
  isDeleted: boolean;
  loyaltyPoints: number;
  phoneNumber: string;
};

export type IWallet = {
  userId: number;
  balance: number;
  loyaltyPoints: number;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
};
