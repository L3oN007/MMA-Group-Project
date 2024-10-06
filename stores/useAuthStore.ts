import { create } from "zustand";

import { IUser } from "@/types/user.type";

type AuthStoreProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearSession: () => void;
};

const useAuthStore = create<AuthStoreProps>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  user: null,
  setUser: (user: IUser) => set({ user }),
  clearSession: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;

