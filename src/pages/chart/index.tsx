import dynamic from "next/dynamic";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
const Chart = dynamic(() => import("@/components/Charts/page"), { ssr: false });

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
