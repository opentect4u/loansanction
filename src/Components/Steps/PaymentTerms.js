import React, { useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import { Button,  } from "antd";
import { PlusOutlined,MinusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
function PaymentTerms({ pressBack, pressNext, data }) {
  const params=useParams()
  const [termList, setTermList] = useState(
    data?.termList?.length
      ? data?.termList
      : [
          {
            sl_no: 0,
            stage: "",
            term: "",
          },
        ]
  );
  const handleDtChange = (index, event) => {
    console.log(event.target.value);
    let data = [...termList];
    data[index][event.target.name] = event.target.value;
    setTermList(data)
    console.log(termList)
    localStorage.removeItem('termList')
    localStorage.setItem('termList',JSON.stringify(data))
  };
  const addDt = (dt) => {
    setTermList([...termList, dt]);

    console.log(termList);
    localStorage.removeItem('termList')
    localStorage.setItem('termList',JSON.stringify(termList))
  };
  const removeDt = (index) => {
    console.log(index)
    let data = [...termList];
    data.splice(index, 1);
    setTermList(data);
    localStorage.removeItem('termList')
    localStorage.setItem('termList',JSON.stringify(data))
  };
  return (
    <div className="py-2 px-4 mx-auto w-full lg:py-2">
      <h2 className="text-2xl text-green-900 font-bold my-3">Payment Terms</h2>
        {termList.map((input, index) => (
          <React.Fragment key={index}>
           {localStorage.getItem('po_status')!='A' &&
           <div className=" flex justify-end items-center my-3 gap-2">
              {termList.length > 1 && (
                <Button
                  className="rounded-full text-white bg-red-800 border-red-800"
                  onClick={() => removeDt(index)}
                  icon={<MinusOutlined />}
                ></Button>
              )}

              <Button
                className="rounded-full bg-green-900 text-white"
                onClick={() => {
                  console.log(termList[index]);
                  addDt({
                    sl_no: 0,
                    stage: "",
                    term: "",
                  });
                }}
                icon={<PlusOutlined />}
              ></Button>
            </div>
}
      <div className="grid gap-4 sm:grid-cols-10 sm:gap-6">

            <div className="sm:col-span-5 hidden">
              <TDInputTemplate
                placeholder="Stage"
                type="text"
                label="Stage"
                name="stage"
                formControlName={input.stage}
                handleChange={(event)=>{
                    handleDtChange(index,event)
                
                }}
                disabled={localStorage.getItem('po_status')=='A'  ?true:false}

                // handleChange={formik.handleChange}
                // handleBlur={formik.handleBlur}
                mode={1}
              />
              {/* {formik.errors.price_basis_flag && formik.touched.price_basis_flag && (
                      <VError title={formik.errors.price_basis_flag} />
                    )} */}
            </div>
            <div className="sm:col-span-10">
              <TDInputTemplate
                placeholder="Payment Terms"
                type="text"
                label="Payment Terms"
                name="term"
                formControlName={input.term}
                handleChange={(event)=>{handleDtChange(index,event)}}
                // handleChange={formik.handleChange}
                // handleBlur={formik.handleBlur}
                mode={3}
                disabled={localStorage.getItem('po_status')=='A'  ?true:false}

              />
              {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                
            </div>
            </div>
           
          </React.Fragment>
        ))}

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
            onClick={() => pressNext(termList)}
          >
            Next
          </button>
        </div>
      </div>
  );
}

export default PaymentTerms;
