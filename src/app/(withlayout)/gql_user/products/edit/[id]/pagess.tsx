"use client";
import { getUserInfo } from "@/app/auth/auth.service";
import { UPDATEPRODUCT } from "@/app/graphl/mutations/products/products";
import { GETSINGLEPRODUCT } from "@/app/graphl/query/products/product";
import { GETPRODUCTSBRANDS } from "@/app/graphl/query/products/productBrands";
import { GETPRODUCTSCATEGORIES } from "@/app/graphl/query/products/productCategory";
import { GETPRODUCTSUPPLIER } from "@/app/graphl/query/products/supplier";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/forms/FormSelectFields";
import {
  monitorColorOptions,
  monitorPaymentStatusOptions,
  monitorSalesStatusOptions,
  monitorSizeOptions,
  productWarrantyOptions,
} from "@/constants/selectOptions";

import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Button, Checkbox, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { userRole: role, id } = getUserInfo() as any;

type InputData = {
  title?: string;
  productImageUrl?: string;
  description?: string;
  color?: string;
  size?: string;
  price?: number;
  discount?: number;
  warranty?: number;
  stockStatus?: boolean;
  productCategoryId?: string;
  productBrandId?: string;
  productSupplierId?: string;
  isPublished?: boolean;
  paymentStatus?: string;
  salesStatus?: string;
  isItemSupplierVerified?: boolean;
};

const EditProductPage = ({ params }: any) => {
  const router = useRouter();
  const { id } = params;
  const productId = id;
  console.log(productId);

  const { data: getSingleData } = useQuery(GETSINGLEPRODUCT, {
    variables: { productId },
  });

  const [updateProduct, { data, loading, error }] = useMutation(UPDATEPRODUCT, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });
  const { data: categories } = useQuery(GETPRODUCTSCATEGORIES);
  const { data: brands } = useQuery(GETPRODUCTSBRANDS);
  const { data: suppliers } = useQuery(GETPRODUCTSUPPLIER);

  const productCategoryOptions = categories?.productsCategories?.map(
    (categoryElement: any) => {
      return {
        label: categoryElement?.name,
        value: categoryElement?.id,
      };
    }
  );
  const productBrandsOptions = brands?.productsBrands?.map(
    (categoryElement: any) => {
      return {
        label: categoryElement?.name,
        value: categoryElement?.id,
      };
    }
  );
  const productSupplierOptions = suppliers?.productsSupplier?.map(
    (categoryElement: any) => {
      return {
        label: categoryElement?.name,
        value: categoryElement?.id,
      };
    }
  );

  const [formData, setFormData] = useState<InputData>({
    title: getSingleData?.singleProduct?.title || "",
    productImageUrl: getSingleData?.singleProduct?.productImageUrl || "",
    description: getSingleData?.singleProduct?.description || "",
    color: getSingleData?.singleProduct?.color || "",
    size: getSingleData?.singleProduct?.size || "",
    price: getSingleData?.singleProduct?.price || "",
    discount: getSingleData?.singleProduct?.discount || "",
    warranty: getSingleData?.singleProduct?.warranty || "",
    stockStatus: getSingleData?.singleProduct?.stockStatus,
    productCategoryId: getSingleData?.singleProduct?.productCategoryId || "",
    productBrandId: getSingleData?.singleProduct?.productBrandId || "",
    productSupplierId: getSingleData?.singleProduct?.productSupplierId || "",
    isPublished: getSingleData?.singleProduct?.isPublished,
    paymentStatus: getSingleData?.singleProduct?.paymentStatus || "",
    salesStatus: getSingleData?.singleProduct?.salesStatus || "",
    isItemSupplierVerified:
      getSingleData?.singleProduct?.isItemSupplierVerified,
  });

  const handleCheckboxChange = (name: string, value: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async () => {
    try {
      console.log("formData", formData);
      await updateProduct({
        variables: {
          productId: id,
          inputs: formData,
        },
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    if (data) {
      message.success(data.updateProduct.message);
      router.push(`/${role}/products/views`);
    }
  }, [data]);

  return (
    <>
      <div className="main" style={{ margin: "20px" }}>
        <Form submitHandler={handleOnSubmit} defaultValues={formData}>
          <Col span={8} style={{ marginBottom: "10px" }}>
            <Checkbox
              name="isPublished"
              checked={formData.isPublished}
              onChange={(e) =>
                handleCheckboxChange("isPublished", e.target.checked)
              }
            >
              is Published
            </Checkbox>
            <Checkbox
              name="isItemSupplierVerified"
              checked={formData.isItemSupplierVerified}
              onChange={(e) =>
                handleCheckboxChange("isItemSupplierVerified", e.target.checked)
              }
            >
              Is Supplier Verified
            </Checkbox>
            <Checkbox
              name="stockStatus"
              checked={formData.stockStatus}
              onChange={(e) =>
                handleCheckboxChange("stockStatus", e.target.checked)
              }
            >
              Is Out of Stock
            </Checkbox>
          </Col>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditProductPage;
