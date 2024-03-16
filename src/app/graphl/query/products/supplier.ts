import { gql } from "@apollo/client";

export const GETPRODUCTSUPPLIER = gql`
  query getProductsSupplier {
    productsSupplier {
      id
      name
      description
    }
  }
`;
