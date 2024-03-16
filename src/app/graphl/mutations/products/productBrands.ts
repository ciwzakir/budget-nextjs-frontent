import { gql } from "@apollo/client";

export const CREATEPRODUCTSBRANDS = gql`
  mutation CreateNewProductBrand($inputs: ProductBrandInputs) {
    createProductBrand(inputs: $inputs) {
      message
      products {
        id
      }
    }
  }
`;
