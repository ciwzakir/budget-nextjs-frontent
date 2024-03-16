import { gql } from "@apollo/client";

export const CREATESUPPLIERS = gql`
  mutation createProductSupplier($inputs: ProductSupplierInputs) {
    createProductSupplier(inputs: $inputs) {
      message
      products {
        id
        description
      }
    }
  }
`;
