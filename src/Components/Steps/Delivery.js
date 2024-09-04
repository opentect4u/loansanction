import React, { useEffect, useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import VError from "../../Components/VError";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { Switch } from "antd";

function Delivery({ pressBack, pressNext, data }) {
  console.log(data);
  // localStorage.setItem('ship_to',data.delivery)
  const params = useParams();
  localStorage.setItem("bill_to",'NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046')
  const [deliveryConfirm, setDelivery] = useState(localStorage.getItem('ware_house_flag')=='Y'?true:false);
  const [delivery, setDeliveryAdd] = useState(data.delvery?data.delivery:"")
    // localStorage.getItem('order_type') == "G"
    //   ? "NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046"
    //   : (data.delivery?data.delivery:localStorage.getItem('ship_to'))
  
  useEffect(()=>{
    setDeliveryAdd(localStorage.getItem('order_type') == "G"
    ? "NextGen Automation Pvt Ltd Panchla,Beltala,National Highway 6,Surikhali, P.S.- Uluberia, District - Howrah, Pin-711322"
    : data.delivery)
    localStorage.setItem('ship_to',localStorage.getItem('order_type')=='G'?"NextGen Automation Pvt Ltd Panchla,Beltala,National Highway 6,Surikhali, P.S.- Uluberia, District - Howrah, Pin-711322":data.delivery)
  },[])
  // useEffect(()=>{
  //  setDelivery(localStorage.getItem('ware_house_flag')=='Y'?true:false)
  //  setDeliveryAdd(localStorage.getItem('ware_house_flag')=='Y'?"NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046":data.delivery)
  // },[localStorage.getItem('ware_house_flag')])

  const onSubmit = () => {
    if (delivery) {
      console.log(delivery);
      pressNext(delivery);
    }
  };
  return (
    <section className="bg-white dark:bg-[#001529]">
      <div className="py-2 px-4 mx-auto w-full lg:py-2">
        <h2 className="text-2xl text-green-900 font-bold my-3">
          Delivery Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <TDInputTemplate
              placeholder="Bill To"
              type="text"
              label="Bill To"
              name="bill_to"
              formControlName={
                "NextGen Automation Pvt Ltd Unit - 102, 1st Floor, PS PACE 1/1A, Mahendra Roy Lane Kolkata 700046"
              }
              disabled={true}
              mode={3}
            />

            {localStorage.getItem('order_type') == "P" && (
              <p
                className="mt-3 text-sm text-gray-500 font-bold float-right dark:text-gray-300"
                id="file_input_help"
              >
                Delivery to warehouse?{" "}
                <Switch
                  size="small"
                  value={deliveryConfirm}
                  disabled={localStorage.getItem('po_status')=='A' ?true:false}
                  onClick={(e) => {
                    
                    console.log(e);
                    localStorage.setItem('ware_house_flag',e==false?'N':'Y')
                    setDelivery(e);
                    if (deliveryConfirm == false) {
                      console.log(deliveryConfirm);
                      setDeliveryAdd(
                        "NextGen Automation Pvt Ltd Panchla,Beltala,National HIghway 6,Surikhali, P.S.- Uluberia, Distric - Howrah, Pin-711322"
                      );
                      localStorage.setItem('ship_to', "NextGen Automation Pvt Ltd Panchla,Beltala,National HIghway 6,Surikhali, P.S.- Uluberia, Distric - Howrah, Pin-711322")
                      console.log(delivery);
                    } else {
                      setDeliveryAdd("");
                      localStorage.setItem('ship_to','')
                    }
                  }}
                  defaultChecked
                />
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-bold text-green-900 dark:text-gray-100">
              Ship To
            </label>
            <textarea
              rows="8"
              className="bg-white border-1 border-gray-400 text-sm rounded-lg  focus:border-green-900 active:border-green-600 focus:ring-green-600 focus:border-1 duration-500 block w-full p-2.5 dark:bg-bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Ship To"
              name="ship_to"
              value={delivery}
              onChange={(text) => {setDeliveryAdd(text.target.value); localStorage.setItem('ship_to',text.target.value)}}
              disabled={localStorage.getItem('order_type') == "G" || deliveryConfirm ? true : false || 

                localStorage.getItem('po_status')=='A' ?true:false


              }
            />
            {!delivery && <VError title={"Address is required"} />}
          </div>
        </div>
        <div className="flex pt-4 justify-between">
          <button
            className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
            onClick={pressBack}
          >
            Back
          </button>
          <button
            type="submit"
            className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
            onClick={() => onSubmit()}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Delivery;
