"use client";

import { useGetSingleBillQuery } from "@/redux/api/draftApi";
import React, { Suspense, useRef } from "react";
import BillHeader from "./BillHeader";
import BillBody from "./BillBody";
import BillFooter from "./BillFooter";
import { Button, Spin } from "antd";
import { useReactToPrint } from "react-to-print";
import "./css/main.bill.css";

export type IDProps = {
  params: any;
};

const SinglePage = ({ params }: IDProps) => {
  const { id } = params;

  const { isError, isLoading, data } = useGetSingleBillQuery(id);
  console.log(data);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Print Now",
  });

  return (
    <Suspense fallback={<Spin />}>
      <div className="main__div-center">
        <div className="print" style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={handlePrint}
            style={{ position: "sticky", top: 0 }}
          >
            Print this out!
          </Button>
        </div>
        <div
          style={{
            margin: "50px 50px 50px 70px",
            maxWidth: "700vh",
            minHeight: "100vh",
            fontSize: "16px",
          }}
          ref={componentRef}
        >
          <BillHeader data={data} key={data?.id}></BillHeader>
          <BillBody data={data} key={data?.id}></BillBody>
          <BillFooter data={data} key={data?.id}></BillFooter>
        </div>
      </div>
    </Suspense>
  );
};

export default SinglePage;
