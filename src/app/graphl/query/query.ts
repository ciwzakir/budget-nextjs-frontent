import { gql } from "@apollo/client";

export const MYPROFILESFEATURES = gql`
  query myProfileFetures {
    myprofile {
      user {
        id
        name
        email
        userRole
        products {
          id
          title
          productImageUrl
          description
          color
          size
          price
          discount
          warranty
          salesStatus
          stockStatus
          paymentStatus
          isItemSupplierVerified
          productRating {
            rating
          }
          productReview {
            id
            review
          }
          productBrand {
            id
            name
          }
          productCategory {
            id
            name
          }
          productSupplier {
            id
            name
          }
          isPublished
          createdAt
        }
        profile {
          id
          biodata {
            id
            userName {
              firstName
              middleName
              lastName
            }
            userAddress {
              city
              street
              zipCode
            }
            personalInformation {
              id
              age
              bloodGroup
              gender
              maritalStatus
              phoneNumber
              nationality
            }
            educationQualifications {
              id
              fieldOfStudy
              graduationYear
              instituteName
              obtainGrade
              qualification
            }
          }
        }
        posts {
          id
          title
          content
          isPublished
          createdAt
          isPublished
          postCategory {
            id
          }
          author {
            email
          }
        }
      }
    }
  }
`;

export const GETSINGLEPOST = gql`
  query singlePost($postId: ID!) {
    post(postId: $postId) {
      id
      title
      isPublished
      content
      createdAt
    }
  }
`;
