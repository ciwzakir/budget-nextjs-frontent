import { gql } from "@apollo/client";

export const GETSINGLEPRODUCT = gql`
  query getSingleProduct($productId: ID!) {
    singleProduct(productId: $productId) {
      id
      color
      createdAt
      description
      discount
      isItemSupplierVerified
      isPublished
      paymentStatus
      price
      productBrand {
        id
        name
        description
      }
      productCategory {
        id
        name
      }
      productImageUrl
      productRating {
        rating
      }
      productReview {
        id
        review
      }
      productSupplier {
        id
        name
      }
      salesStatus
      stockStatus
      size
      title
      warranty
    }
  }
`;
