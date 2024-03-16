import { gql } from "@apollo/client";

export const GETPRODUCTSCATEGORIES = gql`
  query getProductsCategories {
    productsCategories {
      id
      name
      description
      products {
        price
        productReview {
          review
        }
      }
    }
  }
`;
