import React from "react";
import { useParams } from "react-router";

import Backbtn from "../../Components/Backbtn";
import StockTransTemplate from "../../Components/StockTransTemplate";
import HeadingTemplate from '../../Components/HeadingTemplate'
function StockAssignForm() {
  const params = useParams();
  console.log(params, "params");
  return (
   
      <section className="bg-white dark:bg-[#001529]">
        <div className="py-2 px-4 mx-auto w-5/6 lg:py-8">
          <HeadingTemplate
            text={params.id > 0 ? "Update assignment" : "Assign stock"}
          />
          <StockTransTemplate mode={1}/>
          
        </div>
      </section>
   
  );
}

export default StockAssignForm;
