import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BtnComp from "../../../Components/BtnComp";
import HeadingTemplate from "../../../Components/HeadingTemplate";
import VError from "../../../Components/VError";
import TDInputTemplate from "../../../Components/TDInputTemplate";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Message } from "../../../Components/Message";
import { url } from "../../../Address/BaseUrl";
import { Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DialogBox from "../../../Components/DialogBox";
import PrintComp from "../../../Components/PrintComp";
import AuditTrail from "../../../Components/AuditTrail";
import { ListBox } from 'primereact/listbox';
        
const CategoryForm = () => {
  const params = useParams();
  const [loading,setLoading]=useState(false)
  const [visible,setVisible]=useState(false)
  const [data,setData]=useState()
  const [products,setProducts]=useState([])
  const [count,setCount]=useState(0)

  const navigate=useNavigate()
  const [flag,setFlag]=useState(4)
  const initialValues = {
    catnm: "",
  };
  const [formValues,setValues] = useState(initialValues)
  var result;
   useEffect(()=>{
    if(+params.id>0){
      setLoading(true)
        axios.post(url+'/api/getcategory',{id:params.id}).then(res=>{
      console.log(res.data.msg.catg_name)
      setData(res.data?.msg)
      // setLoading(false)
      setValues({catnm:res.data.msg.catg_name})
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
    axios.post(url+'/api/getCatWithProd',{id:params.id}).then(res=>{
      console.log(res)
      // console.log(res.data.msg.catg_name)
      setProducts(res.data?.msg)
      setLoading(false)
      products.length=0
      for(let i=0;i<res?.data?.msg.length;i++){
        products.push({name:res?.data?.msg[i]?.prod_name,code:res?.data?.msg[i]?.sl_no})
      }
      setProducts(products)

      console.log(products)
      // setValues({catnm:res.data.msg.catg_name})
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
  }
    },[count])
  const onSubmit = (values) => {
    console.log(values);
    setLoading(true)
    axios.post(url+'/api/addcategory',{id:+params.id,name:values.catnm,user:localStorage.getItem('email')}).then(res=>{
      setLoading(false)
      if(res.data.suc>0){
        Message('success',res.data.msg)
        if(params.id==0)
          formik.handleReset()
          setCount(prev=>prev+1)
      }
      else{
        Message('error',res.data.msg)

      }
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
    
    console.log(result)
  };
  const onDelete=()=>{
    console.log(params.id)
    setVisible(true)
  }
  const deleteItem=()=>{
    setLoading(true)
    console.log(params.id)
    setVisible(false)
    axios.post(url+'/api/deletecategory',{id:params.id,user:localStorage.getItem('email')}).then(res=>{
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
  const validationSchema = Yup.object({
    catnm: Yup.string().required("Category name is required"),
  });
  const formik = useFormik({
    initialValues:(+params.id>0?formValues:initialValues),
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize:true
  });
  return (
   
    <section  className="bg-transparent dark:bg-[#001529]">
          {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
          <HeadingTemplate
              text={params.id > 0 ? "Update product category" : "Add product category"}
              mode={params.id>0?1:0}
              title={'Category'}
              data={params.id && data?data:''}
            />
            <div className="grid grid-cols-6 gap-2">
            <div className={products.length>0?'w-full col-span-4 bg-white p-6 rounded-2xl':'w-full col-span-6 bg-white p-6 rounded-2xl'}>
          <Spin indicator={<LoadingOutlined spin />} size="large" className="text-green-900 dark:text-gray-400" spinning={loading}>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              
              <TDInputTemplate
                placeholder="Type category name..."
                type="text"
                label="Category name"
                name="catnm"
                formControlName={formik.values.catnm}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                mode={1}
              />

              {formik.errors.catnm && formik.touched.catnm ? (
                <VError title={formik.errors.catnm} />
              ) : null}
            </div>
            { params.id>0 &&  <AuditTrail data={data}/>}
            
          </div>

    
          <BtnComp mode={params.id>0?'E':'A'} onDelete={()=>onDelete()} onReset={formik.handleReset}/>
         
        </form>
        </Spin>
      </div>
      {products.length>0 &&  
  
  <div class='mx-auto w-full col-span-2'>
  <h2 className="text-white rounded-t-xl p-2 text-lg font-light bg-green-900">Product(s) under this category</h2>
   <ListBox multiple options={products} optionLabel="name" className="w-full md:w-14rem" />
  
  </div>

}
            </div>
         
      <DialogBox
        visible={visible}
        flag={flag}
        onPress={() => setVisible(false)}
        onDelete={()=>deleteItem()}
      />
    </section>
  );
};

export default CategoryForm;
