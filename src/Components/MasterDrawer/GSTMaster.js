import React,{ useEffect, useState }from 'react'
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import BtnComp from "../../Components/BtnComp";
import HeadingTemplate from "../../Components/HeadingTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import TDInputTemplate from "../../Components/TDInputTemplate";
import VError from "../../Components/VError";
import axios from "axios";
import { url } from "../../Address/BaseUrl";
import { Message } from "../../Components/Message";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AuditTrail from "../../Components/AuditTrail";

function GSTMaster({onClose}) {
  const params = useParams();
  const navigate=useNavigate()
  const [data,setData]=useState()
  const [loading, setLoading] = useState(false);
  const [count,setCount]=useState(0)

  var categories = [];
  const [cat, setCat] = useState([]);
  const initialValues = {
    gst_type: "",
    gst_rate:"",
  };
  const [formValues, setValues] = useState(initialValues);
  const onSubmit = (values) => {
    setLoading(true);
    console.log(values);
    axios
      .post(url + "/api/addgst", {
        gst_id: 0,
        user: localStorage.getItem("email"),
        gst_type: values.gst_type,
        gst_rate: values.gst_rate,
      })
      .then((res) => {
        setLoading(false);
        setCount(prev=>prev+1)
        if (res.data.suc > 0) {
          Message("success", res.data.msg);
          formik.handleReset();
          onClose()
        } else {
          Message("error", res.data.msg);
        }
      }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});;;
  };
  const validationSchema = Yup.object({
    gst_type: Yup.string().required("Type is required"),
    gst_rate:Yup.number().required("Rate is required").max(100,'Invalid value!').min(0,'Invalid Value'),
  });
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

 
  return (
    <section  className="bg-transparent dark:bg-[#001529]">
          {/* <HeadingTemplate
              text={params.id > 0 ? "Update GST" : "Add GST"}
              mode={params.id>0?1:0}
              title={'GST'}
              data={params.id && data?data:''}
            /> */}
             <h2 className="text-2xl text-green-900 font-bold my-3">
            Add GST
          </h2>
          <div className="w-full bg-white p-6 rounded-2xl">
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="text-green-900 dark:text-gray-400"
          spinning={loading}
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-1">
  
                <TDInputTemplate
                  placeholder="GST Type"
                  type="text"
                  label="GST Type"
                  name="gst_type"
                  formControlName={formik.values.gst_type}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                  // disabled={params.id > 0}
                />
                {formik.errors.gst_type && formik.touched.gst_type ? (
                  <VError title={formik.errors.gst_type} />
                ) : null}
              </div>
              <div className="sm:col-span-1 mb-2">
                <TDInputTemplate
                  placeholder="Type GST Rate"
                  type="number"
                  label="GST Rate"
                  name="gst_rate"
                  formControlName={formik.values.gst_rate}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />
                {formik.errors.gst_rate && formik.touched.gst_rate ? (
                  <VError title={formik.errors.gst_rate} />
                ) : null}
              </div>
            
          
            </div>
            <BtnComp
              mode={"A"}
              onReset={formik.handleReset}
            />
          </form>
        </Spin>
      </div>
    </section>
  )
}
export default GSTMaster
