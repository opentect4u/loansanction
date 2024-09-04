import React, { useEffect, useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import VError from "../../Components/VError";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
function OrderType({pressNext,type}) {
  const params = useParams();
  const initialValues = {
    order_type: type,
  };
  const [formValues, setValues] = useState(initialValues);
  const validationSchema = Yup.object({
    order_type: Yup.string().required("Order type is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
    pressNext(values)
  };
  const formik = useFormik({
    initialValues: +params.id > 0 ? formValues : initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  useEffect(()=>{
    console.log('rendered')
  },[])
  return (
    <div className="flex justify-center">
      <form className="mx-auto w-full" onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl text-green-900 font-bold my-3">Order Type</h2>

        <div className="">
          <TDInputTemplate
            placeholder="Order type"
            type="text"
            label="Order type"
            name="order_type"
            data={[
              { name: "General", code: "G" },
              { name: "Project Specific", code: "P" },
            ]}
            formControlName={formik.values.order_type}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            mode={2}
          />
          {formik.errors.order_type && formik.touched.order_type && (
            <VError title={formik.errors.order_type} />
          )}
        </div>
        <div className="flex pt-4 justify-end">
          <button
            type="submit"
            className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
            //   onClick={() => stepperRef.current.nextCallback()}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderType;
