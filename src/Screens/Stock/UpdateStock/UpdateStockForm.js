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
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../Components/DialogBox";
import PrintComp from "../../../Components/PrintComp";
import AuditTrail from "../../../Components/AuditTrail";
function UpdateStockForm() {
    const params = useParams();
    const [loading,setLoading]=useState(false)
    const [visible,setVisible]=useState(false)
    const [count,setCount]=useState(0)
    const [data,setData]=useState()
    const navigate=useNavigate()
    const [flag,setFlag]=useState(4)
    const [itemList,setItemList] = useState([])
    const initialValues = {
        stock_dt: "",
        item_id:"",
        stock:""
    };
    const [formValues, setValues] = useState(initialValues);

    useEffect(() => {
        setLoading(true)
        axios.post(url+'/api/getproduct',{id:0}).then(res=>{
            console.log(res)
            for(let i=0;i<res?.data?.msg?.length;i++){
                itemList.push({
                    name:res?.data?.msg[i].prod_name,
                    code:res?.data?.msg[i].sl_no
                })
            }
            setItemList(itemList)
            setLoading(false)
        
        })
      if (+params.id > 0){
        setLoading(true)
        axios.post(url + "/api/getunit", { id: +params.id })
        .then((res) => {
          console.log(res.data.msg.unit_name);
  
          setLoading(false)
          axios.post(url+'/api/getstock',{id:+params.id}).then(resstock=>{
          setData(resstock.data?.msg)
            
            console.log(resstock)
          setValues({ stock_dt: resstock.data.msg.stock_dt,stock:resstock.data.msg.stock,item_id: resstock.data.msg.item_id });
            
        
        })
        }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
      }
    }, [count]);
    const onSubmit = (values) => {
      setLoading(true)
      console.log(values);
      axios
        .post(url + "/api/add_edit_stock", {
          sl_no: +params.id,
          stock_dt: values.stock_dt,
          item_id: values.item_id,
          stock: values.stock,
          user: localStorage.getItem("email"),
        })
        .then((res) => {
          setLoading(false)
          if (res.data.suc > 0) {
            Message("success", res.data.msg);
            setCount(prev=>prev+1)
            if(params.id==0)
              formik.handleReset();
          } else {
            Message("error", res.data.msg);
          }
        }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
    };
    const validationSchema = Yup.object({
      stock_dt: Yup.string().required("Date is required!"),
      item_id: Yup.string().required("Item is required!"),
      stock: Yup.string().required("Stock is required!").matches(/^[0-9.]*$/,'Invalid value!'),
    });
    const onDelete=()=>{
      console.log(params.id)
      setVisible(true)
    }
    const deleteItem=()=>{
      console.log(params.id)
      setVisible(false)
      setLoading(true)
      axios.post(url+'/api/deleteunit',{id:params.id,user:localStorage.getItem('email')}).then(res=>{
        console.log(res)
        setLoading(false)
        if(res.data.suc>0){
          Message('success',res.data.msg)
          navigate(-1)
        }
        else{
          Message('error',res.data.msg)
        }
      })
    }
    const formik = useFormik({
      initialValues: +params.id > 0 ? formValues : initialValues,
      onSubmit,
      validationSchema,
      validateOnMount: true,
      enableReinitialize: true,
    });
    return (
      <section  className="bg-transparent dark:bg-[#001529]">
            {/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
            <HeadingTemplate
                text={params.id > 0 ? "Update stock" : "Open Stock"}
                mode={params.id>0?1:0}
                title={'Open/Update Stock'}
                data={params.id && data?data:''}
              />
            <div className="w-full bg-white p-6 rounded-2xl">
             
          <Spin indicator={<LoadingOutlined spin />} size="large" className="text-green-900 dark:text-gray-400" spinning={loading}>   
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
              <div className="sm:col-span-4">
                <TDInputTemplate
                  placeholder="Type date"
                  type="date"
                  label="Date"
                  name="stock_dt"
                  formControlName={formik.values.stock_dt}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                  disabled={+params.id>0}
                />
  
                {formik.errors.stock_dt && formik.touched.stock_dt ? (
                  <VError title={formik.errors.stock_dt} />
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <TDInputTemplate
                  placeholder="Item"
                  type="Choose item"
                  label="Item"
                  name="item_id"
                  data={itemList}
                  formControlName={formik.values.item_id}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={2}
                  disabled={+params.id>0}

                />
  
                {formik.errors.item_id && formik.touched.item_id ? (
                  <VError title={formik.errors.item_id} />
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <TDInputTemplate
                  placeholder="Stock"
                  type="number"
                  label="Stock"
                  name="stock"
                  formControlName={formik.values.stock}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  mode={1}
                />
  
                {formik.errors.stock && formik.touched.stock ? (
                  <VError title={formik.errors.stock} />
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
    );
}

export default UpdateStockForm
