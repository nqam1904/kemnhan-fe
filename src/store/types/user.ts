export type User = {
  id: string;
  createdAt: string;
  avatar: string | null;
  email: string;
  firstName: string;
  lastName: string;
};

export type UserProfileResponse = {
  data: User;
};

export interface UserResponse {
  //   data: TResponseApi<User[]>;
  data: User;
}
