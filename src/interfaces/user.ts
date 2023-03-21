export interface User {
  username: string;
  id: string;
}

export interface UserResponse {
  data: {
    me: User;
  };
}
