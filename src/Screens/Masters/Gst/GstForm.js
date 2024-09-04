import React,{ useEffect, useState }from 'react'
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import BtnComp from "../../../Components/BtnComp";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import VError from "../../../Components/VError";
import axios from "axios";
import { url } from "../../../Address/BaseUrl";
import { Message } from "../../../Components/Message";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AuditTrail from "../../../Components/AuditTrail";
import DialogBox from '../../../Components/DialogBox';

function GstForm() {
  const params = useParams();
  const navigate=useNavigate()
  const [data,setData]=useState()
  const [loading, setLoading] = useState(false);
  const [count,setCount]=useState(0)
  const [flag,setFlag]=useState(4)
  const [visible,setVisible]=useState(false)
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
        gst_id: +params.id,
        user: localStorage.getItem("email"),
        gst_type: values.gst_type,
        gst_rate: values.gst_rate,
      })
      .then((res) => {
        setLoading(false);
        setCount(prev=>prev+1)
        if (res.data.suc > 0) {
          Message("success", res.data.msg);
          if (params.id == 0) formik.handleReset();
        } else {
          Message("error", res.data.msg);
        }
      }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});;;
  };
  const onDelete = ()=>{
    setVisible(true)
  }
  const validationSchema = Yup.object({
    gst_type: Yup.string().required("Type is required"),
    gst_rate:Yup.number().required("Rate is required").max(100,'Invalid value!').min(0,'Invalid Value'),
  });
  const formik = useFormik({
    initialValues: +params.id > 0 ? formValues : initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    // axios.post(url + "/api/getcategory", { id: 0}).then((res) => {
    //   for (let i = 0; i < res?.data?.msg?.length; i++) {
    //     categories.push(
    //       {
    //       name: res?.data?.msg[i].catg_name,
    //       code: res?.data?.msg[i].sl_no
    //     }
    //   );
    //   }
    //   setCat(categories);
    // });
  
    if (+params.id > 0) {
      setLoading(true);

      axios.post(url + "/api/getgst", { id: params.id }).then((res) => {
        console.log(res.data.msg);
        setData(res.data?.msg)
        setLoading(false);
        setValues({
          gst_rate: res?.data?.msg.gst_rate,
          gst_type: res?.data?.msg.gst_type,
        });
      });
    }
  }, [count]);

  const deleteItem=()=>{
    setLoading(true)
    console.log(params.id)
    setVisible(false)
    axios.post(url+'/api/deletegst',{id:params.id,user:localStorage.getItem('email')}).then(res=>{
      console.log(res)
      setLoading(false)
      if(res.data.suc>0){
        Message('success',res.data.msg)
        navigate(-1)
      }
      else{
        Message('error',res.data.msg)

      }
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
  }
  return (
    <section  className="bg-transparent dark:bg-[#001529]">
          <HeadingTemplate
              text={params.id > 0 ? "Update GST" : "Add GST"}
              mode={params.id>0?1:0}
              title={'GST'}
              data={params.id && data?data:''}
            />
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
            
          
              { params.id>0 && <AuditTrail data={data}/>}
            </div>
            <BtnComp
              mode={params.id > 0 ? "E" : "A"}
              onReset={formik.handleReset}
              onDelete={()=>onDelete()}
            />
          </form>
        </Spin>
      </div>
      <DialogBox
        visible={visible}
        flag={flag}
        onPress={() => setVisible(false)}
        onDelete={()=>deleteItem()}
      />
    </section>
  )
}

export default GstForm