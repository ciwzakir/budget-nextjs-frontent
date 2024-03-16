import { gql } from "@apollo/client";

export const DELETEPOST_GQL = gql`
  mutation DeleteAPost($postId: ID!) {
    deletepost(postId: $postId) {
      message
      post {
        id
        title
      }
    }
  }
`;

export const CREATE_PROFILE_GQL = gql`
  mutation CreateProfile($profileData: UserBioDataPayload) {
    createprofile(profileData: $profileData) {
      message
      profile {
        id
        biodata {
          personalInformation {
            age
          }
        }
      }
    }
  }
`;
