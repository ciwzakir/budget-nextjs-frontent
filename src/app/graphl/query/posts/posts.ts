import { gql } from "@apollo/client";

export const GETPOSTCATEGORIES = gql`
  query getpostCategory {
    postCategories {
      id
      name
      posts {
        content
        author {
          email
          id
        }
      }
    }
  }
`;
