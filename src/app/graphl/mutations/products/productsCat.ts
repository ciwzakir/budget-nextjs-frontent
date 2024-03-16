import { gql } from "@apollo/client";

export const CREATEPRODUCTCATEGORY = gql`
  mutation ProductCatCreate($inputs: ProductCategoryPayload) {
    createProductCategory(inputs: $inputs) {
      message
      categoryInfo {
        id
        description
      }
    }
  }
`;
