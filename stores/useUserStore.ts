import { create } from "zustand";

import { IUser } from "@/types/user.type";

type UserStoreProps = {
  user: IUser | null;
  setUser: (user: IUser) => void;
};

const useUserStore = create<UserStoreProps>((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
}));

export default useUserStore;

