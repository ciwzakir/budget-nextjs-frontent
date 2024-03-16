"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Collapse,
  Select,
  DatePicker,
  Image,
  Modal,
  Space,
  Spin,
  Divider,
  Button,
  Tag,
  Input,
  message,
  Radio,
  Checkbox,
  Col,
  Row,
} from "antd";

import {
  ContactsTwoTone,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import dayjs from "dayjs";
import ActionBarComponent from "@/components/ui/AtionBar";
import { getUserInfo } from "@/app/auth/auth.service";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import RETable from "@/components/ui/RETable";
import { GETPRODUCTSCATEGORIES } from "@/app/graphl/query/products/productCategory";
import { IPriceRange, useDebouncedPriceRange } from "../utils/utils";
import { GETPRODUCTSBRANDS } from "@/app/graphl/query/products/productBrands";
import { useMutation } from "@apollo/client";
import { DELETETEPRODUCT } from "@/app/graphl/mutations/products/products";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { userRole: role } = getUserInfo() as any;

const ProductsPage = () => {
  const { loading, error, data, refetch } = useQuery(MYPROFILESFEATURES);
  const { data: categories } = useQuery(GETPRODUCTSCATEGORIES);
  const { data: getBrands } = useQuery(GETPRODUCTSBRANDS);
  const [deleteproduct] = useMutation(DELETETEPRODUCT, {
    refetchQueries: [{ query: MYPROFILESFEATURES }],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { products } = data?.myprofile?.user ?? {};

  if (data) {
    console.log("products", products);
  }

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showPublished, setShowPublished] = useState(false);
  const [showStockStatus, setShowStockStatus] = useState(false);
  const [showVerifiedProducts, setVerifiedProducts] = useState(false);
  const [dateRange, setDateRange] = useState("");

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const [priceRange, setPriceRange] = useState<IPriceRange>({
    fromValue: 1000,
    ToValue: 999999999,
  });

  const debouncedPriceRange = useDebouncedPriceRange({
    rangeQuery: priceRange,
    delay: 3000,
  });

  const handleCategoryChange = (checkedValues: any) => {
    setSelectedCategories(checkedValues);
  };
  const handleBrandsChange = (checkedValues: any) => {
    setSelectedBrands(checkedValues);
  };

  const handleVerifiedProductsChange = (checked: any) => {
    setVerifiedProducts(checked);
  };
  const handleShowPublishedChange = (checked: any) => {
    setShowPublished(checked);
  };
  const handleShowStockStatusChange = (checked: any) => {
    setShowStockStatus(checked);
  };

  const handleDateRangeChange = (payload: any) => {
    // console.log("handleDateRangeChange", payload);
    setDateRange(payload);
  };

  const handlePriceRangeChange = (key: keyof IPriceRange, value: number) => {
    const updatedPriceRange = { ...priceRange, [key]: value };
    setPriceRange(updatedPriceRange);
  };

  const filteredProducts = products?.filter((product: any) => {
    const categoryCondition =
      selectedCategories.length === 0 ||
      (product?.productCategory &&
        // @ts-expect-error
        selectedCategories.includes(product?.productCategory?.id));
    const brandCondition =
      selectedBrands.length === 0 ||
      (product?.productBrand &&
        // @ts-expect-error
        selectedBrands.includes(product?.productBrand?.id));

    const stockStatusCondition = showStockStatus
      ? product.stockStatus === true
      : true;

    const showVerifiedProductsCondition = showVerifiedProducts
      ? product.isItemSupplierVerified === true
      : true;
    const publishedCondition = showPublished
      ? product.isPublished === true
      : true;

    const datePriceCondition =
      !priceRange ||
      (product?.price >= priceRange.fromValue &&
        product?.price <= priceRange.ToValue);

    const dateRangeCondition =
      !dateRange ||
      (product?.createdAt >= dateRange[0]?.valueOf() &&
        product?.createdAt <= dateRange[1]?.valueOf());

    // Return true if all conditions are met
    return (
      categoryCondition &&
      publishedCondition &&
      dateRangeCondition &&
      stockStatusCondition &&
      datePriceCondition &&
      showVerifiedProductsCondition &&
      brandCondition
    );
  });

  const [idToDelete, setIdToDelete] = useState(null);

  const deleteHandler = async (id: any) => {
    setIsModalOpen(true);
    setIdToDelete(id);
  };

  const handleOk = async () => {
    if (idToDelete) {
      await deleteproduct({
        variables: {
          productId: idToDelete,
        },
      });
      setIsModalOpen(false);
      setIdToDelete(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIdToDelete(null);
  };

  // const debouncedSearchTerm = useDebounced({
  //   searchQuery: searchTerm,
  //   delay: 600,
  // });

  // if (!!debouncedSearchTerm) {
  //   query["searchTerm"] = debouncedSearchTerm;

  if (loading) return <Spin />;

  if (error) return <p>Error : {error.message}</p>;

  const count = async (): Promise<number> => {
    if (filteredProducts?.length >= 0) {
      await filteredProducts;
      return filteredProducts.length;
    }
    return 0;
  };

  console.log(count());
  // const deleteHandler = async (id: any) => {
  //   await deletepost({
  //     variables: {
  //       postId: id,
  //     },
  //   });
  //   message.success(deleteData?.deletepost?.message);
  // };

  // const { id } = params;

  const columns = [
    {
      title: "Image",
      dataIndex: "productImageUrl",
      render: (data: any) => {
        if (data) {
          return <Image src={data} width={100} alt="image" />;
        } else return "Not Image Found";
      },
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      render: function (data: any) {
        if (data) {
          return data.name;
        } else return "No Category Found";
      },
    },

    {
      title: "Is Published",
      dataIndex: "isPublished",
      render: function (data: any) {
        if (data === true) {
          return "Published";
        } else return "Not Published";
      },
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: function (data: any) {
        if (data && dayjs(data).isValid()) {
          return dayjs(parseInt(data)).format("DD MMM YYYY HH:mm:ss");
          // return dayjs(data).format("MMM, D, YYYY hh:mm A");
        } else {
          // Handle the case where 'data' is not a valid date
          return "Invalid date";
        }
      },
      sorter: (a: any, b: any) => a.createdAt - b.createdAt,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "productPrice",
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: "Actions",
      render: (data: any) => {
        return (
          <div className="action-div">
            <Link href={`/${role}/products/views/${data.id}`}>
              <Button type="primary" ghost style={{ marginRight: "10px" }}>
                <EyeOutlined /> View
              </Button>
            </Link>

            <Link href={`/${role}/products/edit/${data.id}`}>
              <Button
                className="action__button-style"
                type="primary"
                ghost
                style={{ marginRight: "10px" }}
              >
                <EditOutlined /> Edit
              </Button>
            </Link>

            <Modal
              title="Deletion Confirmation"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are you sure you want to delete ?</p>
            </Modal>
            <Button
              danger
              onClick={() => deleteHandler(data?.id)}
              style={{ marginRight: "10px" }}
            >
              <DeleteOutlined /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    // setPage(page);
    // setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    // setSortBy(field as string);
    // setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    console.log("Before reset.", selectedCategories);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setShowPublished(false);
    setShowStockStatus(false);
    setVerifiedProducts(false);
    setDateRange("");
    setPriceRange({
      fromValue: 10,
      ToValue: 999999999,
    });

    // Log the selectedCategories state after a brief delay
    setTimeout(() => {
      console.log("Filters reset.", selectedCategories);
    }, 100);
  };

  return (
    <>
      <div className="main" style={{ margin: "20px" }}>
        <div className="bread-cumb">
          <Suspense fallback={<Spin />}>
            <UMBreadCrumb
              items={[
                {
                  label: "Add New",
                  link: `/${role}/products/create`,
                },
                {
                  label: "Products Category",
                  link: `/${role}/products/categories`,
                },
                {
                  label: "Edit Products",
                  link: `/${role}/products/edit/${data?.id}`,
                },
              ]}
            />
          </Suspense>
        </div>
        <div
          className="sub__div--style"
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <ActionBarComponent title="">
            <Link href={`/${role}/products/create`}>
              <Button type="primary">Add New Product</Button>
            </Link>
          </ActionBarComponent>
        </div>

        <Row>
          <Col flex="1 1 200px" style={{ marginRight: "15px" }}>
            <div className="content-section">
              <Suspense fallback={<Spin />}>
                <RETable
                  loading={false}
                  columns={columns}
                  dataSource={filteredProducts}
                  // dataSource={products}
                  pageSize={5}
                  total={40}
                  // total={count}
                  showSizeChanger={true}
                  onChangeOfPagintion={onPaginationChange}
                  onChangeTable={onTableChange}
                  showPagination={true}
                ></RETable>
              </Suspense>
            </div>
          </Col>

          <Col flex="0 1 300px">
            <h2 style={{ margin: "30px 0" }}> Search and Filter Data</h2>

            <Row>
              <Input
                size="large"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "70%",
                  marginRight: "10px",
                }}
              />

              {(!!selectedCategories ||
                !!selectedBrands ||
                !!showPublished ||
                !!priceRange ||
                !!showStockStatus ||
                !!dateRange) && (
                <Button
                  style={{ margin: "0px 5px" }}
                  type="primary"
                  onClick={resetFilters}
                >
                  <ReloadOutlined />
                </Button>
              )}
            </Row>

            <div className="accordions">
              <Divider orientation="left">Default Size</Divider>

              <Collapse
                style={{ marginBottom: "5px" }}
                items={[
                  {
                    key: "1",
                    label: "Show Only Published Only?",
                    children: (
                      <Checkbox
                        checked={showPublished}
                        onChange={(e) =>
                          handleShowPublishedChange(e.target.checked)
                        }
                      >
                        Show Only Published Only?
                      </Checkbox>
                    ),
                  },
                ]}
              />

              <Collapse
                style={{ marginBottom: "5px" }}
                items={[
                  {
                    key: "2",
                    label: "Available Stock",
                    children: (
                      <Checkbox
                        checked={showStockStatus}
                        onChange={(e) =>
                          handleShowStockStatusChange(e.target.checked)
                        }
                      >
                        Exclude Out of Stock
                      </Checkbox>
                    ),
                  },
                ]}
              />

              <Collapse
                style={{ marginBottom: "5px" }}
                items={[
                  {
                    key: "3",
                    label: "Filter By Brands",
                    children: (
                      <Checkbox.Group
                        style={{ width: "100%" }}
                        onChange={handleBrandsChange}
                      >
                        <Row>
                          {getBrands?.productsBrands?.map((brand: any) => (
                            <Col span={8} key={brand.id}>
                              <Checkbox value={brand.id}>{brand.name}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                    ),
                  },
                ]}
              />

              <Collapse
                style={{ marginBottom: "5px" }}
                items={[
                  {
                    key: "4",
                    label: "Filter By Category",
                    children: (
                      <Checkbox.Group
                        style={{ width: "100%" }}
                        onChange={handleCategoryChange}
                      >
                        <Row>
                          {categories?.productsCategories?.map((cat: any) => (
                            <Col span={8} key={cat.id}>
                              <Checkbox value={cat.id}> {cat.name}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                    ),
                  },
                ]}
              />

              <Collapse
                style={{ marginBottom: "5px" }}
                items={[
                  {
                    key: "5",
                    label: "Filter By Price",
                    children: (
                      <Col>
                        <h3 style={{ margin: "30px 0" }}> Filter By Price</h3>

                        <Input
                          placeholder="From"
                          value={debouncedPriceRange.fromValue}
                          onChange={(e) =>
                            handlePriceRangeChange(
                              "fromValue",
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                        <Input
                          placeholder="To"
                          value={debouncedPriceRange.ToValue}
                          onChange={(e) =>
                            handlePriceRangeChange(
                              "ToValue",
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </Col>
                    ),
                  },
                ]}
              />

              <Collapse
                style={{ marginBottom: "5px" }}
                items={[
                  {
                    key: "6",
                    label: "Filter By Date Range",
                    children: (
                      <Col>
                        <h3 style={{ margin: "30px 0" }}>
                          Filter By Date Range
                        </h3>
                        <Space direction="vertical" size={12}>
                          <RangePicker
                            showTime
                            onChange={(e) => handleDateRangeChange(e)}
                          />
                        </Space>
                      </Col>
                    ),
                  },
                ]}
              />

              <Collapse
                style={{ marginBottom: "5px" }}
                items={[
                  {
                    key: "7",
                    label: "verified",
                    children: (
                      <Checkbox
                        checked={showVerifiedProducts}
                        onChange={(e) =>
                          handleVerifiedProductsChange(e.target.checked)
                        }
                      >
                        Show verified only
                      </Checkbox>
                    ),
                  },
                ]}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductsPage;
