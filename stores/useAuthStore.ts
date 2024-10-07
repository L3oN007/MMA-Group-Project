import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { IUser } from "@/types/user.type";

type AuthStoreProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  token: string | null;
  setToken: (token: string) => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  expired: Date | null;
  setExpired: (expired: Date) => void;
  onLogout: () => void;
};

const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      user: null,
      setUser: (user: IUser) => set({ user }),
      onLogout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          refreshToken: null,
          expired: null,
        }),
      token: null,
      setToken: (token: string) => set({ token }),
      refreshToken: null,
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      expired: null,
      setExpired: (expired: Date) => set({ expired }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
