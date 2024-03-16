"use client";

import { getUserInfo } from "@/app/auth/auth.service";
import { UPDATEPRODUCT } from "@/app/graphl/mutations/products/products";
import { GETSINGLEPRODUCT } from "@/app/graphl/query/products/product";
import { GETPRODUCTSBRANDS } from "@/app/graphl/query/products/productBrands";
import { GETPRODUCTSCATEGORIES } from "@/app/graphl/query/products/productCategory";
import { GETPRODUCTSUPPLIER } from "@/app/graphl/query/products/supplier";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import Form from "@/components/forms/Form";
import FormCheckboxField from "@/components/forms/FormBoolean";
import FormBooleanField from "@/components/forms/FormBooleanFields";
import FormInput from "@/components/forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/forms/FormSelectFields";
import ImageUploaderPage from "@/components/ui/uploadImage";
import {
  monitorColorOptions,
  monitorPaymentStatusOptions,
  monitorSalesStatusOptions,
  monitorSizeOptions,
  productIsPublishedOptions,
  productWarrantyOptions,
} from "@/constants/selectOptions";
import { productUpdateSchemas } from "@/validatorsSchema/products/products";

import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import Router from "next/router";
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
  console.log(getSingleData);
  const [updateProduct, { data, loading, error }] = useMutation(UPDATEPRODUCT, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });
  const { data: categories } = useQuery(GETPRODUCTSCATEGORIES);
  const { data: brands } = useQuery(GETPRODUCTSBRANDS);
  const { data: suppliers } = useQuery(GETPRODUCTSUPPLIER);
  const [showVerifiedProducts, setVerifiedProducts] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
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

  const initialValuesUpdateProduct = {
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
  };

  const handleVerifiedProductsChange = (checked: any) => {
    setVerifiedProducts(checked);
  };

  const handleOnSubmit = async (formData: InputData) => {
    console.log("formData", formData);
    await updateProduct({
      variables: {
        productId: id,
        inputs: {
          title: formData.title,
          productImageUrl: imageUrl,
          description: formData.description,
          color: formData.color,
          size: formData.size,
          price: Number(formData.price),
          discount: Number(formData.discount),
          warranty: Number(formData.warranty),
          stockStatus: formData.stockStatus,
          productCategoryId: formData.productCategoryId,
          productBrandId: formData.productBrandId,
          productSupplierId: formData.productSupplierId,
          isPublished: formData.isPublished,
          paymentStatus: formData.paymentStatus,
          salesStatus: formData.salesStatus,
          isItemSupplierVerified: formData.isItemSupplierVerified,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      message.success(data?.updateProduct?.message);
      router.push(`/${role}/products/views`);
    }
  }, [data]);

  return (
    <>
      <div className="main" style={{ margin: "20px" }}>
        <Form
          submitHandler={handleOnSubmit}
          defaultValues={initialValuesUpdateProduct}
          resolver={yupResolver(productUpdateSchemas)}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="title"
                size="large"
                label="Product title"
              />
            </Col>
            {/* <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="productImageUrl"
                size="large"
                label="Product Image Url"
              />
            </Col> */}
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="description"
                size="large"
                label="Product description"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormSelectField
                size="large"
                name="color"
                options={monitorColorOptions}
                label="Product Color"
                placeholder="Select"
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormSelectField
                size="large"
                name="size"
                options={monitorSizeOptions}
                label="Product Size"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="number"
                name="price"
                size="large"
                label="Product price"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="number"
                name="discount"
                size="large"
                label="Product discount"
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormSelectField
                size="large"
                name="warranty"
                options={productWarrantyOptions}
                label="Product Category"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormSelectField
                size="large"
                name="productCategoryId"
                options={productCategoryOptions as SelectOptions[]}
                label="Product Category"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormSelectField
                size="large"
                name="productBrandId"
                options={productBrandsOptions as SelectOptions[]}
                label="Product Brand"
                placeholder="Select"
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormSelectField
                size="large"
                name="productSupplierId"
                options={productSupplierOptions as SelectOptions[]}
                label="Product Supplier"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormSelectField
                size="large"
                name="paymentStatus"
                options={monitorPaymentStatusOptions}
                label="Product payment Status"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormSelectField
                size="large"
                name="salesStatus"
                options={monitorSalesStatusOptions}
                label="Product sales  Status"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            ></Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}></Row>
          <Row>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              {/* <FormCheckboxField
                name="isPublished"
                label="Is Published"
                checked={getSingleData?.singleProduct?.isPublished}
                // defaultChecked={false}
                handleChange={(isChecked) =>
                  console.log("Checkbox is checked:", isChecked)
                }
              /> */}

              <FormBooleanField
                size="large"
                name="isPublished"
                options={productIsPublishedOptions}
                label="Is Published"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <FormCheckboxField
                name="isItemSupplierVerified"
                label="Is Supplier Verified"
                checked={showVerifiedProducts}
                handleChange={handleVerifiedProductsChange}
              />
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <ImageUploaderPage
                name="productImage"
                setImageUrl={setImageUrl}
              />
            </Col>
          </Row>

          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default EditProductPage;
