import React, { useEffect, useState } from "react";
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
import PrintComp from "../../../Components/PrintComp";
import AuditTrail from "../../../Components/AuditTrail";
function ProductForm() {
  const [cat, setCat] = useState([]);
  const navigate=useNavigate()
  var categories = [];
  const [count,setCount]=useState(0)
    const [data,setData]=useState()
  const [loading, setLoading] = useState(false);
  const initialValues = {
    cat_id: "",
    prodnm: "",
    ar_no: "",
    pr_no: "",
    md_no: "",
    hsn_code: "",
    // stk_cnt: "",
    prod_make: "",
    prod_des: "",
  };
  const [formValues, setValues] = useState(initialValues);
  const params = useParams();

  const onSubmit = (values) => {
    setLoading(true);
    console.log(values);
    axios
      .post(url + "/api/addproduct", {
        p_id: +params.id,
        user: localStorage.getItem("email"),
        p_name: values.prodnm,
        p_cat: values.cat_id.toString(),
        p_article: values.ar_no,
        p_model: values.md_no,
        p_part: values.pr_no,
        p_hsn: values.hsn_code,
        // p_stock: values.stk_cnt.toString(),
        p_make: values.prod_make,
        p_detailed: values.prod_des,
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
  const validationSchema = Yup.object({
    // cat_id: Yup.string().required("Category is required"),
    cat_id: Yup.string().required("Category is required"),
    prodnm: Yup.string().required("Product description is required"),
    hsn_code: Yup.string().required("HSN Code is required").matches(/^[0-9.-]*$/,'Invalid HSN'),
    prod_make: Yup.string().required("Product make is required"),
    // stk_cnt: Yup.number().min(1),
  });

  const formik = useFormik({
    initialValues: +params.id > 0 ? formValues : initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  useEffect(() => {
    setLoading(true);
    axios.post(url + "/api/getcategory", { id: 0}).then((res) => {
      setLoading(false);
      for (let i = 0; i < res?.data?.msg?.length; i++) {
        categories.push(
          {
          name: res?.data?.msg[i].catg_name,
          code: res?.data?.msg[i].sl_no
        }
      );
      }
      setCat(categories);
    });

    if (+params.id > 0) {
      setLoading(true);

      axios.post(url + "/api/getproduct", { id: params.id }).then((res) => {
        console.log(res.data.msg);
        setData(res.data?.msg)
        setLoading(false);
        setValues({
          cat_id: res?.data?.msg.prod_cat,
          prodnm: res?.data?.msg.prod_name,
          ar_no: res?.data?.msg.article_no,
          pr_no: res?.data?.msg.part_no,
          md_no: res?.data?.msg.model_no,
          hsn_code: res?.data?.msg.hsn_code,
          // stk_cnt: res?.data?.msg.stk_cnt,
          prod_make: res?.data?.msg.prod_make,
          prod_des: res?.data?.msg.prod_desc,
        });
      });
    }
  }, [count]);
  // const onChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  // const onSearch = (value) => {
  //   console.log('search:', value);
  // };
  return (
    <section  className="bg-transparent dark:bg-[#001529]">
          {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
          <HeadingTemplate
              text={params.id > 0 ? "Update product" : "Add product"}
              mode={params.id>0?1:0}
              title={'Product'}
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
              <div className="sm:col-span-2">
  
                <TDInputTemplate
                  placeholder="Select category..."
                  type="text"
                  label="Category"
                  name="cat_id"
                  formControlName={formik.values.cat_id}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  data={cat}
                  mode={2}
                  disabled={params.id > 0}
                />
                {formik.errors.cat_id && formik.touched.cat_id ? (
                  <VError title={formik.errors.cat_id} />
                ) : null}
              </div>
              <div className="sm:col-span-2 mb-2">
                <TDInputTemplate
                  placeholder="Type product name..."
                  type="text"
                  label="Product"
                  name="prodnm"
                  formControlName={formik.values.prodnm}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.prodnm && formik.touched.prodnm ? (
                  <VError title={formik.errors.prodnm} />
                ) : null}
              </div>
              <div className="sm:col-span-2 mb-2">
                <TDInputTemplate
                  placeholder="Type product make..."
                  type="text"
                  label="Product make"
                  name="prod_make"
                  formControlName={formik.values.prod_make}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                  disabled={params.id > 0}
                />

                {formik.errors.prod_make && formik.touched.prod_make ? (
                  <VError title={formik.errors.prod_make} />
                ) : null}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 mb-5 ">
              <div className="w-full mt-4">
                <TDInputTemplate
                  placeholder="Type article number..."
                  type="text"
                  label="Article no."
                  name="ar_no"
                  formControlName={formik.values.ar_no}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.ar_no && formik.touched.ar_no ? (
                  <VError title={formik.errors.ar_no} />
                ) : null}
              </div>
              <div className="w-full mt-4">
                <TDInputTemplate
                  placeholder="Type part number..."
                  type="text"
                  label="Part no."
                  name="pr_no"
                  formControlName={formik.values.pr_no}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.pr_no && formik.touched.pr_no ? (
                  <VError title={formik.errors.pr_no} />
                ) : null}
              </div>
              <div className="w-full mt-4">
                <TDInputTemplate
                  placeholder="Type model number..."
                  type="text"
                  label="Model no."
                  name="md_no"
                  formControlName={formik.values.md_no}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.md_no && formik.touched.md_no ? (
                  <VError title={formik.errors.md_no} />
                ) : null}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <TDInputTemplate
                  placeholder="Type HSN Code..."
                  type="text"
                  label="HSN Code"
                  name="hsn_code"
                  formControlName={formik.values.hsn_code}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.hsn_code && formik.touched.hsn_code ? (
                  <VError title={formik.errors.hsn_code} />
                ) : null}
              </div>
              {/* <div>
                <TDInputTemplate
                  placeholder="99999"
                  type="number"
                  label="Stock Count"
                  name="stk_cnt"
                  formControlName={formik.values.stk_cnt}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />

                {formik.errors.stk_cnt && formik.touched.stk_cnt ? (
                  <VError title={formik.errors.stk_cnt} />
                ) : null}
              </div> */}
              <div className="sm:col-span-2">
                <TDInputTemplate
                  placeholder="Type description..."
                  label="Detailed description"
                  name="prod_des"
                  formControlName={formik.values.prod_des}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={3}
                />
                {formik.errors.prod_des && formik.touched.prod_des ? (
                  <VError title={formik.errors.prod_des} />
                ) : null}
              </div>
              { params.id>0 && <AuditTrail data={data}/>}
            </div>
            <BtnComp
              mode={params.id > 0 ? "E" : "A"}
              onReset={formik.handleReset}
            />
          </form>
        </Spin>
      </div>
    </section>
  );
}

export default ProductForm;
