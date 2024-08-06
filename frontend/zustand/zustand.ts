import { create } from "zustand";

type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  coin: number;
  diamond: number;
  google_id: string;
  user_avatar: UserAvatar[];
};

type UserAvatar = {
  id: string;
  is_active: boolean;
  Avatar: Avatar;
};

type Avatar = {
  id: string;
  image: string;
  coin: number;
  diamond: number;
};

type Store = {
  user: User;
  SET_USER: (newUser: User) => void;
};

const useStore = create<Store>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    username: "",
    google_id: "",
    coin: 0,
    diamond: 0,
    user_avatar: [
      {
        id: "",
        is_active: false,
        Avatar: { id: "", coin: 0, diamond: 0, image: "" },
      },
    ],
  },
  SET_USER: (newUser: User) => set({ user: newUser }),
}));

export default useStore;
