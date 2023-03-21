import { gql } from "@apollo/client";

// export const AUTHENTICATE = gql`
//   mutation {
//     authenticate(credentials: { $username: String!, $password: String! }) {
//       accessToken
//     }
//   }
// `;

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`;
