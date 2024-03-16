import * as yup from "yup";

export const initialValuesOfCreateProduct = {
  title: "",
  productImageUrl: "",
  description: "",
  color: "",
  size: "",
  price: "",
  discount: "",
  warranty: "",
  stockStatus: false,
  productCategoryId: "",
  productBrandId: "",
  productSupplierId: "",
  isPublished: false,
  paymentStatus: "",
  salesStatus: "",
  isItemSupplierVerified: false,
};

export const productCreateSchema = yup.object().shape({
  title: yup.string().min(6).max(32).required(),
  productImageUrl: yup
    .string()
    .url("Invalid URL")
    .required("Product image URL is required"),
  description: yup.string().required("Description is required"),
  color: yup.string().required("Color is required"),
  size: yup.string().required("Size is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  discount: yup
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount cannot exceed 100"),
  warranty: yup.number().positive("Warranty must be a positive number"),
  stockStatus: yup.boolean().required("Stock status is required"),
  productCategoryId: yup.string().required("Product category ID is required"),
  productBrandId: yup.string().required("Product brand ID is required"),
  productSupplierId: yup.string().required("Product supplier ID is required"),
  isPublished: yup.boolean().required("Publish status is required"),
  paymentStatus: yup.string().required("Payment status is required"),
  salesStatus: yup.string().required("Sales status is required"),
  isItemSupplierVerified: yup
    .boolean()
    .required("Supplier verification status is required"),
});

export const productUpdateSchemas = yup.object().shape({
  title: yup.string().min(6).max(32).required(),
  // productImageUrl: yup
  //   .string()
  //   .url("Invalid URL")
  //   .required("Product image URL is required"),
  description: yup.string().required("Description is required"),
  color: yup.string().required("Color is required"),
  size: yup.string().required("Size is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  discount: yup
    .number()
    .min(0, "Discount must be at least 0")
    .max(1000, "Discount cannot exceed 100"),
  warranty: yup.number().positive("Warranty must be a positive number"),
  stockStatus: yup.boolean().required("Stock status is required"),
  productCategoryId: yup.string().required("Product category ID is required"),
  productBrandId: yup.string().required("Product brand ID is required"),
  productSupplierId: yup.string().required("Product supplier ID is required"),
  isPublished: yup.boolean().required("Publish status is required"),
  paymentStatus: yup.string().required("Payment status is required"),
  salesStatus: yup.string().required("Sales status is required"),
  isItemSupplierVerified: yup
    .boolean()
    .required("Supplier verification status is required"),
});
