import { gql } from "@apollo/client";

export const GET_REPOSITORIES_QUERY = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          id
          description
          language
          forksCount
          ownerAvatarUrl
          stargazersCount
          ratingAverage
          reviewCount
        }
      }
    }
  }
`;

export const ME_QUERY = gql`
  query {
    me {
      id
      username
    }
  }
`;
