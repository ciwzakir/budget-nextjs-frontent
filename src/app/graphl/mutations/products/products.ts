import { gql } from "@apollo/client";

export const CREATEPRODUCT = gql`
  mutation addNewProduct($inputs: ProductInputs) {
    addNewProduct(inputs: $inputs) {
      message
      products {
        id
        color
        createdAt
        description
        discount
        price
        isItemSupplierVerified
        isPublished
        paymentStatus
        productBrand {
          name
        }
        productCategory {
          name
        }
        productSupplier {
          name
        }
        salesStatus
        productReview {
          review
        }
      }
    }
  }
`;

export const UPDATEPRODUCT = gql`
  mutation EditProduct($productId: ID!, $inputs: ProductUpdateInputs) {
    updateProduct(productId: $productId, inputs: $inputs) {
      message
      products {
        productCategory {
          id
        }
        id
        isItemSupplierVerified
        color
        description
        paymentStatus
        price
        isPublished
      }
    }
  }
`;

export const DELETETEPRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteproduct(productId: $productId) {
      message
      products {
        id
      }
    }
  }
`;
