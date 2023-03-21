export interface AuthenticateInput {
  username: string;
  password: string;
}

export interface loginResult {
  data: {
    authenticate: {
      accessToken: string;
    };
  };
}

export interface registerResult {
  data: {
    createUser: {
      id: string;
      username: string;
    };
  };
}
