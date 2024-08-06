export type Avatar = {
  id: string;
  image: string;
  diamond: number;
  coin: number;
};

export type UserAvatar = {
  id: string;
  is_active: boolean;
  Avatar: Avatar;
};

export type User = {
  id: string;
  name: string;
  username: string;
  coin: number;
  diamond: number;
  user_avatar: UserAvatar[];
};
