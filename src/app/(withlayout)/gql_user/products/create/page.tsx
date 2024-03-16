"use client";
import { getUserInfo } from "@/app/auth/auth.service";
import { CREATE_PROFILE_GQL } from "@/app/graphl/mutations/muttion";
import { CREATEPRODUCT } from "@/app/graphl/mutations/products/products";
import { GETPRODUCTSBRANDS } from "@/app/graphl/query/products/productBrands";
import { GETPRODUCTSCATEGORIES } from "@/app/graphl/query/products/productCategory";
import { GETPRODUCTSUPPLIER } from "@/app/graphl/query/products/supplier";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import Form from "@/components/forms/Form";
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
  productWarrantyOptions,
} from "@/constants/selectOptions";
import {
  initialValuesOfCreateProduct,
  productCreateSchema,
} from "@/validatorsSchema/products/products";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { userRole: role, id } = getUserInfo() as any;

type InputData = {
  title: string;
  productImageUrl: string;
  description: string;
  color: string;
  size: string;
  price: number;
  discount: number;
  warranty: number;
  stockStatus: boolean;
  productCategoryId: string;
  productBrandId: string;
  productSupplierId: string;
  isPublished: boolean;
  paymentStatus: string;
  salesStatus: string;
  isItemSupplierVerified: boolean;
};

const CreateProductPage = () => {
  const router = useRouter();

  const [addNewProduct, { data, loading, error }] = useMutation(CREATEPRODUCT, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });
  const [imageUrl, setImageUrl] = useState<string>();
  const { data: categories } = useQuery(GETPRODUCTSCATEGORIES);
  const { data: brands } = useQuery(GETPRODUCTSBRANDS);
  const { data: suppliers } = useQuery(GETPRODUCTSUPPLIER);
  // console.log("object", data)
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

  const handleOnSubmit = async (formData: any) => {
    // console.log(imageUrl);
    await addNewProduct({
      variables: {
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
      // console.log(data);
      message.success(data.addNewProduct.message);
      router.push(`/${role}/products/views`);
    }
  }, [data]);

  return (
    <>
      <div className="main" style={{ margin: "20px" }}>
        <Form
          submitHandler={handleOnSubmit}
          defaultValues={initialValuesOfCreateProduct}
          // resolver={yupResolver(productCreateSchema)}
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
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
              <Checkbox name="isPublished" defaultChecked={false}>
                is Published
              </Checkbox>
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
            >
              <Checkbox name="isItemSupplierVerified" defaultChecked={false}>
                is Supplier Verified
              </Checkbox>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              style={{ marginBottom: "10px" }}
            >
              <Checkbox name="stockStatus" defaultChecked={false}>
                Stock Status
              </Checkbox>
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

export default CreateProductPage;
