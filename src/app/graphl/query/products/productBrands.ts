import { gql } from "@apollo/client";

export const GETPRODUCTSBRANDS = gql`
  query getProductsBrands {
    productsBrands {
      id
      name
      description
    }
  }
`;
