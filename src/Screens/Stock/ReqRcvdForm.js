import React from "react";

import { useParams } from "react-router-dom";
import StockTransTemplate from "../../Components/StockTransTemplate";
import HeadingTemplate from "../../Components/HeadingTemplate";

function ReqRcvdForm() {
  const params = useParams();
  console.log(params, "params");
  return (
    <section className="bg-white dark:bg-[#001529]">
    <div className="py-2 px-4 mx-auto w-5/6 lg:py-8">
      <HeadingTemplate
        text={'Requisition Details'}
      />
    <StockTransTemplate mode={3}/>
    </div>
    </section>
  );
}

export default ReqRcvdForm
