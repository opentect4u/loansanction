import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import BtnComp from "../../Components/BtnComp";
import TDInputTemplate from "../../Components/TDInputTemplate";
import { useFormik, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import VError from "../../Components/VError";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { url } from "../../Address/BaseUrl";
import { Message } from "../../Components/Message";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";

function ClientMaster({onClose}) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [count,setCount]=useState(0)
    // const [vendor, setVendor] = useState([]);
    var vendorList = [];
    const params = useParams();
    console.log(params, "params");
    const [data, setData] = useState();
    const [formValues, setValues] = useState({
      clnt_name: "",
      c_location:"",
      c_vendor_code:"",
      locationFields: [
        {
          sl_no: 0,
          c_location:"",
          c_gst:"",
          c_pan:""
        }],
      dynamicFields: [
        {
          sl_no: 0,
          poc_name: "",
          poc_designation: "",
          poc_department: "",
          poc_email: "",
          poc_direct_no: "",
          poc_ext_no: "",
          poc_ph_1: "",
          poc_ph_2: "",
          poc_location: "",
        },
      ],
    });
  
    const initialValues = {
      clnt_name: "",
      c_vendor_code:"",
      locationFields: [
        { sl_no: params.id > 0 ? 0 : formValues.dynamicFields[0].sl_no,
          c_location: "", c_gst: "", c_pan: "" }
      ],
      dynamicFields: [
        {
          sl_no: params.id <= 0 ? 0 : formValues.dynamicFields[0].sl_no,
          poc_name: "",
          poc_designation: "",
          poc_department: "",
          poc_email: "",
          poc_direct_no: "",
          poc_ext_no: "",
          poc_ph_1: "",
          poc_ph_2: "",
          poc_location: "",
        },
      ],
    };
  
    const onSubmit = (values) => {
      console.log("onSubmit");
      setLoading(true);
      console.log(values);
      axios
        .post(url + "/api/addclient", {
          c_id: 0,
          user: localStorage.getItem("email"),
          c_name: values.clnt_name,
          c_vendor_code:values.c_vendor_code.toString(),
          c_loc:values.locationFields,
          c_poc: values.dynamicFields,
        })
        .then((res) => {
          setLoading(false);
          setData(res.data?.msg);
          if (res.data.suc > 0) {
            Message("success", res.data.msg);
            // setCount(prev=>prev+1)
            onClose()
          } else {
            Message("error", res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/error" + "/" + err.code + "/" + err.message);
        });
    };
    const validationSchema = Yup.object({
      clnt_name: Yup.string().required("Client's name is required"),
      
      locationFields: Yup.array().of(
        Yup.object().shape({
          c_location: Yup.string().required("Client location is required"),
          c_gst: Yup.string().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,'Incorrect format!'),
      c_pan: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,'Incorrect format!'),
         
      })),   
      c_vendor_code: Yup.string().required("Vendor code is required"),
      dynamicFields: Yup.array().of(
        Yup.object().shape({
          poc_name: Yup.string().required('Please enter name'),
          poc_designation: Yup.string().optional(),
          poc_department: Yup.string().optional(),
          poc_email: Yup.string().required('Please enter email').email("Incorrect email format"),
          poc_direct_no: Yup.string().optional(),
          poc_ext_no: Yup.string().optional(),
          poc_ph_1: Yup.string().required('Please enter primary number').length(10,'Must be 10 digits!').matches(/^[2-9]{2}[0-9]{8}$/,'Invalid phone no.'),
          poc_ph_2: Yup.string().length(10,'Must be 10 digits!').matches(/^[2-9]{2}[0-9]{8}$/,'Invalid phone no.'),
          poc_location: Yup.string().required('Location is required!'),
        })
      ),
    });
  
    // const formik = useFormik({
    //     initialValues: +params.id > 0 ? formValues : initialValues,
    //     onSubmit,
    //     validationSchema,
    //     validateOnMount: true,
    //     enableReinitialize: true
    // });
    useEffect(() => {
    //   if (+params.id > 0) {
    //     setLoading(true);
    //     axios
    //       .post(url + "/api/getclient", { id: params.id })
    //       .then((res) => {
    //         console.log(res.data.msg, "getclient show");
    //         setData(res.data?.msg);
    //         setLoading(false);
    //         setValues({
    //           ...initialValues,
    //           clnt_name: res.data.msg.client_name,
    //           c_vendor_code:res.data.msg.vendor_code,
    //           c_gst: res?.data?.msg.client_gst,
    //           c_pan: res?.data?.msg.client_pan,
    //           c_location:res?.data?.msg.client_location,
    //         });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         navigate("/error" + "/" + err.code + "/" + err.message);
    //       });
    //     axios
    //       .post(url + "/api/getclientpoc", {
    //         id: params.id,
    //       })
    //       .then((res) => {
    //         setLoading(false);
    //         console.log(res.data.msg[0], "res");
    //         setValues((prevValues) => ({
    //           ...prevValues,
    //           dynamicFields: res.data.msg.map((item, index) => ({
    //             sl_no: item.sl_no,
    //             poc_name: item.poc_name,
    //             poc_designation: item.poc_designation,
    //             poc_department: item.poc_department,
    //             poc_email: item.poc_email,
    //             poc_direct_no: item.poc_direct_no,
    //             poc_ext_no: item.poc_ext_no,
    //             poc_ph_1: item.poc_ph_1,
    //             poc_ph_2: item.poc_ph_2,
    //             poc_location: item.poc_location,
    //           })),
    //         }));
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         navigate("/error" + "/" + err.code + "/" + err.message);
    //       });
    //       axios
    //       .post(url + "/api/getclientloc", {
    //         id: params.id,
    //       })
    //       .then((res) => {
    //         setLoading(false);
    //         console.log(res.data.msg[0], "res");
    //         setValues((prevValues) => ({
    //           ...prevValues,
    //           locationFields: res.data.msg.map((item, index) => ({
    //             sl_no: item.sl_no,
    //             c_location:item.c_loc,
    //             c_gst:item.c_gst,
    //             c_pan:item.c_pan
    //           })),
    //         }));
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         navigate("/error" + "/" + err.code + "/" + err.message);
    //       });
    //   }
      console.log(formValues, "formValues");
      console.log(params.id, "params.id");
    }, [params.id,count]);
    return (
      <section className="bg-transparent dark:bg-[#001529]">
        {/* <HeadingTemplate
          text={params.id > 0 ? "Update client" : "Add client"}
          mode={params.id > 0 ? 1 : 0}
          title={"Client"}
          data={params.id && data ? data : ""}
        /> */}
         <h2 className="text-2xl text-green-900 font-bold my-3">
            Add Client
          </h2>
        <div className="w-full bg-white p-6 rounded-2xl">
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            className="text-green-900 dark:text-gray-400"
            spinning={loading}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnMount={true}
              enableReinitialize={true}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-6 sm:gap-6">
                    <div className="sm:col-span-3">
                      <TDInputTemplate
                        placeholder="Type user name..."
                        type="text"
                        label="Client name"
                        name="clnt_name"
                        formControlName={values.clnt_name}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.clnt_name && touched.clnt_name && (
                        <VError title={errors.clnt_name} />
                      )}
                    </div>
                    <div className="sm:col-span-3">
                      <TDInputTemplate
                        placeholder="Select Vendor..."
                        type="text"
                        label="Vendor Code"
                        name="c_vendor_code"
                        formControlName={values.c_vendor_code}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        // data={vendor}
                        mode={1}
                        // disabled={params.id > 0}
                      />
                      {errors.c_vendor_code && touched.c_vendor_code && <VError title={errors.c_vendor_code} />}
                    </div> 
                    <FieldArray name="locationFields">
            {({ push, remove }) => (
              <>
                {values.locationFields.map((field, index) => (
                  <React.Fragment key={index}>
                    {/* <div className="sm:col-span-2 flex gap-2 justify-end my-2"> */}
                    <div className="sm:col-span-6 flex gap-2 justify-end  mt-6 -mb-6">
                   {values.locationFields?.length>1 &&   <Button
                        className="rounded-full text-white bg-red-800 border-red-800"
                        onClick={() => remove(index)}
                        icon={<MinusOutlined />}
                      ></Button>}
                      <Button
                        className="rounded-full bg-green-900 text-white"
                        onClick={() => push({ sl_no:0, c_location: "", c_gst: "", c_pan: "" })}
                        icon={<PlusOutlined />}
                      ></Button>
                    </div>
                    {/* <div className="grid grid-cols-3"> */}
                    <div className="sm:col-span-2">
                      <TDInputTemplate
                        placeholder="Type Client Location..."
                        type="text"
                        label="Client Location"
                        name={`locationFields[${index}].c_location`}
                        formControlName={values.locationFields[index]?.c_location}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.locationFields?.[index]?.c_location && touched.locationFields?.[index]?.c_location && (
                        <VError title={errors.locationFields[index].c_location} />
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <TDInputTemplate
                        placeholder="Type GST"
                        type="text"
                        label="GST"
                        name={`locationFields[${index}].c_gst`}
                        formControlName={values.locationFields[index]?.c_gst}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.locationFields?.[index]?.c_gst && touched.locationFields?.[index]?.c_gst && (
                        <VError title={errors.locationFields[index].c_gst} />
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <TDInputTemplate
                        placeholder="Type PAN"
                        type="text"
                        label="PAN"
                        name={`locationFields[${index}].c_pan`}
                        formControlName={values.locationFields[index]?.c_pan}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        mode={1}
                      />
                      {errors.locationFields?.[index]?.c_pan && touched.locationFields?.[index]?.c_pan && (
                        <VError title={errors.locationFields[index].c_pan} />
                      )}
                    </div>
  
                    {/* </div> */}
                   
                  </React.Fragment>
                ))}
              </>
            )}
          </FieldArray>
                  
                    <FieldArray name="dynamicFields">
                      
                      {({ push, remove, insert }) => (
                        <>
                        
                          {values.dynamicFields.map((field, index) => (
                            <React.Fragment key={index}>
                              <div className="sm:col-span-6 flex gap-2 justify-end mt-6 -mb-6">
                           {values.dynamicFields?.length>1 &&   <Button
                                className="rounded-full text-white bg-red-800 border-red-800"
                                onClick={() => remove(index)}
                                icon={<MinusOutlined />}
                              ></Button>}
  
                              <Button
                                className="rounded-full bg-green-900 text-white"
                                onClick={() =>
                                  push({
                                    sl_no: 0,
                                    poc_name: "",
                                    poc_designation: "",
                                    poc_department: "",
                                    poc_email: "",
                                    poc_direct_no: "",
                                    poc_ext_no: "",
                                    poc_ph_1: "",
                                    poc_ph_2: "",
                                    poc_location: "",
                                  })
                                }
                                icon={<PlusOutlined />}
                              ></Button>
  
                              </div>
                              <div className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type the name of Contact Person..."
                                  type="text"
                                  label="Contact Person"
                                  name={`dynamicFields[${index}].poc_name`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_name || ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                                 {errors.dynamicFields?.[index]?.poc_name && touched.dynamicFields?.[index]?.poc_name && (
                        <VError title={errors.dynamicFields[index].poc_name} />
                      )}
                              </div>
                              <div  className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type POC Designation..."
                                  type="text"
                                  label="POC Designation"
                                  name={`dynamicFields[${index}].poc_designation`}
                                  formControlName={
                                    values.dynamicFields[index]
                                      ?.poc_designation
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                                {/* {formik.errors.dynamicFields && formik.errors.dynamicFields[index] && formik.errors.dynamicFields[index].designation && formik.touched.dynamicFields && formik.touched.dynamicFields[index] && formik.touched.dynamicFields[index].designation ? (
                                                          <VError title={formik.errors.dynamicFields[index].designation} />
                                                      ) : null} */}
                              </div>
                              <div  className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type POC department..."
                                  type="text"
                                  label="POC Department"
                                  name={`dynamicFields[${index}].poc_department`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_department ||
                                    ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                              </div>
                              <div  className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type POC Email..."
                                  type="text"
                                  label="POC Email"
                                  name={`dynamicFields[${index}].poc_email`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_email || ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                                 {errors.dynamicFields?.[index]?.poc_email && touched.dynamicFields?.[index]?.poc_email && (
                        <VError title={errors.dynamicFields[index].poc_email} />
                      )}
                              </div>
                              <div  className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type POC Direct No."
                                  type="text"
                                  label="POC Direct No"
                                  name={`dynamicFields[${index}].poc_direct_no`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_direct_no ||
                                    ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                              </div>
                              <div  className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type POC Extension No."
                                  type="text"
                                  label="POC Extension No"
                                  name={`dynamicFields[${index}].poc_ext_no`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_ext_no || ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                              </div>
                              <div  className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type POC Primary Phone No."
                                  type="text"
                                  label="POC Primary Phone No."
                                  name={`dynamicFields[${index}].poc_ph_1`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_ph_1 || ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                                 {errors.dynamicFields?.[index]?.poc_ph_1 && touched.dynamicFields?.[index]?.poc_ph_1 && (
                        <VError title={errors.dynamicFields[index].poc_ph_1} />
                      )}
                              </div>
                              <div  className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type POC Secondary Phone No."
                                  type="text"
                                  label="POC Secondary Phone No."
                                  name={`dynamicFields[${index}].poc_ph_2`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_ph_2 || ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                                 {errors.dynamicFields?.[index]?.poc_ph_2 && touched.dynamicFields?.[index]?.poc_ph_2 && (
                        <VError title={errors.dynamicFields[index].poc_ph_2} />)}
                              </div>
                              <div  className="sm:col-span-2">
                                <TDInputTemplate
                                  placeholder="Type POC Location..."
                                  type="text"
                                  label="POC Location"
                                  name={`dynamicFields[${index}].poc_location`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_location ||
                                    ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={1}
                                />
                                {errors.dynamicFields?.[index]?.poc_location && touched.dynamicFields?.[index]?.poc_location && (
                        <VError title={errors.dynamicFields[index].poc_location} />)}
                              </div>
                              {/* <div>
                                <TDInputTemplate
                                  placeholder="Type Delivery Address..."
                                  type="text"
                                  label="Delivery Address"
                                  name={`dynamicFields[${index}].poc_address`}
                                  formControlName={
                                    values.dynamicFields[index]?.poc_address || ""
                                  }
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  mode={3}
                                />
                              </div> */}
                              
                             
                            </React.Fragment>
                          ))}
                          {/* <div className="sm:col-span-2">
                                                  <Button
                                                   className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
                                                      onClick={() => push({ sl_no: 0, poc_name: "", poc_designation: "", poc_department: "", poc_email: "", poc_direct_no: "", poc_ext_no: "", poc_ph_1: "", poc_ph_2: "", poc_location: "", poc_address: "" })}
                                                      icon={<PlusOutlined />}
                                                  >
                                                      Add field
                                                  </Button>
                                              </div> */}
                        </>
                      )}
                    </FieldArray>
                  </div>
                  <BtnComp mode={"A"} onReset={handleReset} />
                </form>
              )}
            </Formik>
          </Spin>
        </div>
      </section>
    );
}

export default ClientMaster
