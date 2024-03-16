import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation addPost($post: PostInput!) {
    addpost(post: $post) {
      message
    }
  }
`;
