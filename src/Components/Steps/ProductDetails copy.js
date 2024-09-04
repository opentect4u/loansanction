import React, { useEffect, useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import { Formik, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import { PlusOutlined, MinusOutlined,InfoOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tag } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import VError from "../../Components/VError";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../Address/BaseUrl";
import Viewdetails from "../Viewdetails";
import DialogBox from "../DialogBox";
import DrawerComp from "../DrawerComp";
function ProductDetails({ pressBack, pressNext,data }) {
  console.log(data)
  const params=useParams()
  const [products, setProducts] = useState([]);
  const [prodList, setProdList] = useState([]);
  const [productInfo, setProdInfo] = useState([]);
  const [units, setUnits] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [cgstList, setcGstList] = useState([]);
  const [sgstList, setsGstList] = useState([]);
  const [igstList, setiGstList] = useState([]);
  const [visible,setVisible]=useState(false)
  const [loading,setLoading]=useState(false)
  const [grand_total,setGrandTotal]=useState(0)
  const [error,setError] = useState(1)
  const [open, setOpen] = useState(false);
  const [mode,setMode] = useState(0)
  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
    if(mode==4){
    setLoading(true)

    prodList.length=0
    setProdList([])
    axios.post(url + "/api/getproduct", { id: 0 }).then((resProd) => {
      setProducts(resProd?.data?.msg);
      setLoading(true)
      for (let i = 0; i < resProd?.data?.msg?.length; i++) {
        prodList.push({
          name: resProd?.data?.msg[i]?.prod_name,
          code: resProd?.data?.msg[i]?.sl_no,
        });
        setProdList(prodList)
        setLoading(false)
      }})
    }
    if(mode==5){
      setUnits([])
      setLoading(true)
      unitList.length=0
      axios.post(url + "/api/getunit", { id: 0 }).then((resUnit) => {
        setUnits(resUnit?.data?.msg);
        for (let i = 0; i < resUnit?.data?.msg?.length; i++) {
          unitList.push({
            name: resUnit?.data?.msg[i]?.unit_name,
            code: resUnit?.data?.msg[i]?.sl_no,
          });

       
    }
    setLoading(false)
  
  })
  }
  if(mode==6){
    setLoading(true)
    cgstList.length=0
    sgstList.length=0
    igstList.length=0
    setGstList([])
    axios.post(url+'/api/getgst',{id:0}).then(resGst=>{
      setGstList(resGst?.data?.msg)
      for(let i=0;i<resGst?.data?.msg?.length;i++){
        if(resGst?.data?.msg[i].gst_type=='CGST'||resGst?.data?.msg[i].gst_type=='cgst')
          cgstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
        if(resGst?.data?.msg[i].gst_type=='IGST'||resGst?.data?.msg[i].gst_type=='igst')
          igstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
        if(resGst?.data?.msg[i].gst_type=='SGST'||resGst?.data?.msg[i].gst_type=='sgst')
          sgstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
      }
  setLoading(false)

    })
  }
  //   if(mode==1){
  //   setLoading(true)
  
  //     vendorsList.length=0
  //     setVendorList([])
  //     axios.post(url + "/api/getvendor", { id: 0 }).then((resVendor) => {
  //       setVendorList(resVendor?.data?.msg);
  //       setVendors(resVendor?.data?.msg)
  //       for (let i = 0; i < resVendor?.data?.msg?.length; i++) {
  //         vendorsList.push({
  //           name: resVendor?.data?.msg[i].vendor_name,
  //           code: resVendor?.data?.msg[i].sl_no,
  //         });
  //       }
  //       setLoading(false)
  //     setVendorList(vendorsList);
  //   })
  // }
  // if(mode==2){
  //   projectList.length=0
  //   setProjects([])
  //   setLoading(true)
  //   axios.post(url + "/api/getproject", { id: 0 }).then((resProj) => {
  //     setProjects(resProj?.data?.msg);
  //     for (let i = 0; i < resProj?.data?.msg?.length; i++) {
  //       projectList.push({
  //         name: resProj?.data?.msg[i].proj_name,
  //         code: resProj?.data?.msg[i].sl_no,
  //       });
  //     }
  //     setProjectList(projectList);
  //     setLoading(false)
  // })}
  
  };
  const getProd = ()=>{
   
  }
  var tot=0
  const [itemList,setItemList]=useState(data?.itemList?.length?data?.itemList:[
    {
      sl_no: 0,
      item_name: "",
      qty: "",
      rate:"",
      disc: "",
      unit: "",
      unit_price: "",
      total: "",
      CGST: "",
      SGST: "",
      IGST:"",
      delivery_date:""
  }
])
useEffect(()=>{
  if(data?.itemList?.length){
    for(let i=0;i<itemList.length;i++){
      tot+=itemList[i].total
    }
    setGrandTotal(tot)
    tot=0
  }
},[])
  
  const handleDtChange=(index,event)=>{
    console.log(event.target.value)
    
    console.log(grand_total)
    if(event.target.name=='item_name')
    setProdInfo(products.filter(e=>e.sl_no==+event.target.value))
    let data = [...itemList];
    data[index][event.target.name] = event.target.value;
    data[index]['unit_price']=+(data[index]['rate']-data[index]['disc'])
    
    if(data[index]['IGST']!=""&& data[index]['IGST']!='IGST')
      data[index]['total']=+(data[index]['unit_price']*data[index]['qty']*(data[index]['IGST']/100))+(data[index]['unit_price']*data[index]['qty'])
    else
     data[index]['total']=+(data[index]['unit_price']*data[index]['qty']*(data[index]['CGST']/100)+data[index]['unit_price']*data[index]['qty']*(data[index]['SGST']/100))+(data[index]['unit_price']*data[index]['qty'])
    for(let i=0;i<itemList.length;i++){
      tot+=itemList[i].total
    }
    setGrandTotal(tot)
    tot=0
    setItemList(data)
    console.log(itemList)
    localStorage.removeItem('itemList')
    localStorage.setItem('itemList',JSON.stringify(data))
  }
  const addDt=(dt)=>{
    setItemList([...itemList,dt
  //     {
  //     sl_no: 0,
  //     item_name: "",
  //     qty: "",
  //     rate:"",
  //     disc: "",
  //     unit: "",
  //     unit_price: "",
  //     total: "",
  //     CGST: "",
  //     SGST: "",
  //     IGST: "",
  //     delivery_date: ""
  // }
])

    console.log(itemList)
    localStorage.removeItem('itemList')
    localStorage.setItem('itemList',JSON.stringify(itemList))
  }
  const removeDt = (index) => {
    let data = [...itemList];
    data.splice(index, 1)
    setItemList(data)
    tot=0
    for(let i=0;i<data.length;i++){
      tot+=data[i].total
    }
    setGrandTotal(tot)
    tot=0
    localStorage.removeItem('itemList')
    localStorage.setItem('itemList',JSON.stringify(data))
}
  useEffect(() => {
    axios.post(url + "/api/getproduct", { id: 0 }).then((resProd) => {
      setProducts(resProd?.data?.msg);
      setLoading(true)
      for (let i = 0; i < resProd?.data?.msg?.length; i++) {
        prodList.push({
          name: resProd?.data?.msg[i]?.prod_name,
          code: resProd?.data?.msg[i]?.sl_no,
        });
      }
      axios.post(url + "/api/getunit", { id: 0 }).then((resUnit) => {
        setUnits(resUnit?.data?.msg);
        for (let i = 0; i < resUnit?.data?.msg?.length; i++) {
          unitList.push({
            name: resUnit?.data?.msg[i]?.unit_name,
            code: resUnit?.data?.msg[i]?.sl_no,
          });
        }
        axios.post(url+'/api/getgst',{id:0}).then(resGst=>{
          setGstList(resGst?.data?.msg)
          for(let i=0;i<resGst?.data?.msg?.length;i++){
            if(resGst?.data?.msg[i].gst_type=='CGST'||resGst?.data?.msg[i].gst_type=='cgst')
              cgstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
            if(resGst?.data?.msg[i].gst_type=='IGST'||resGst?.data?.msg[i].gst_type=='igst')
              igstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
            if(resGst?.data?.msg[i].gst_type=='SGST'||resGst?.data?.msg[i].gst_type=='sgst')
              sgstList.push({name:resGst?.data?.msg[i].gst_rate,code:resGst?.data?.msg[i].gst_rate})
          }
      setLoading(false)

        })
      });
      // setProdList(prodList)
    });
  }, []);
  

  const [formValues, setValues] = useState({
    dynamicFields: [
      {
        sl_no: 0,
        item_name: "",
        qty: "",
        disc: "",
        unit: "",
        unit_price: "",
        total: "",
        GST: "",
        delivery_date: "",
        // poc_address: "",
      },
    ],
  });


  return (
    <section className="bg-white dark:bg-[#001529]">
       <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-green-900 dark:text-gray-400"
        spinning={loading}
      >
      <div className="py-2 px-4 mx-auto w-full lg:py-2">
        <h2 className="text-2xl text-green-900 font-bold my-3">Item Details</h2>
     
            
        {itemList.map((input,index)=>
                      <React.Fragment key={index}>
                      <div className="sm:col-span-2 flex gap-2 justify-end items-center my-3">

                      {localStorage.getItem('po_status')!='A' &&   <>
                        {itemList.length > 1 && (
                            <Button
                              className="rounded-full text-white bg-red-800 border-red-800"
                              onClick={() => removeDt(index)}
                              icon={<MinusOutlined />}
                            ></Button>
                          )}

                          <Button
                            className="rounded-full bg-green-900 text-white"
                            onClick={() =>{
                              console.log(itemList[index])
                              addDt({
                                sl_no: 0,
                                item_name: "",
                                qty: "",
                                rate:"",
                                disc: "",
                                unit: "",
                                unit_price: "",
                                total: "",
                                CGST: "",
                                SGST: "",
                                IGST: "",
                                delivery_date:itemList[index].delivery_date
                                // poc_address: "",
                              })
                            }
                            }
                            icon={<PlusOutlined />}
                          ></Button>
                        
                        </>}
                         
                           {itemList[index]?.item_name && itemList[index]?.item_name!='Item name' &&  <button
                            className=" inline-flex items-center justify-center text-sm font-medium text-center text-white bg-primary-700 h-8 w-8 bg-blue-700 hover:duration-500 hover:scale-110  rounded-full  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600 dark:focus:ring-primary-900 hover:bg-primary-800" onClick={()=>
                            {  console.log(itemList[index])
                            //  setFlag(6)
                             setProdInfo(products.filter(e=>e.sl_no==+itemList[index]?.item_name))
                             setVisible(true)
                            }
                            
                            }
                          >
                            <InfoOutlined/>
                          </button>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-12 sm:gap-6">
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Item name"
                              type="text"
                              label="Item name"
                              data={prodList}
                              formControlName={
                              input.item_name
                              }
                              name='item_name'
                              handleChange={(event)=>{handleDtChange(index,event); console.log(event.target.value)}}
                              // handleBlur={handleBlur}
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              mode={2}
                            />
                            {(input.item_name=='Item name' || input.item_name=='') && (
                      <VError title={'Name is required!'} />
                    )}
                     {localStorage.getItem('po_status')!='A' &&  <a className="my-2" onClick={()=>{setMode(3);setOpen(true)}}>
              <Tag  color="#4FB477">
                Not in list?
                </Tag>
                </a>
}
                          </div>

                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Quantity"
                              type="number"
                              label="Quantity"
                              formControlName={
                                input.qty
                              }
                              name='qty'
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              handleChange={(event)=>handleDtChange(index,event)}
                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {(input.qty<=0 || !input.qty) && (
                      <VError title={'A valid quantity is required!'} />
                    )}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Rate"
                              type="number"
                              label="Rate"
                              formControlName={
                                input.rate
                              }
                              name='rate'
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {(input.rate<0 || !input.rate) && (
                          <VError title={'A valid rate is required!'} />
                        )}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Discount"
                              type="number"
                              label="Discount"
                              formControlName={
                                input.disc
                              }
                              name='disc'
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {input.disc<0 && (
                      <VError title={'Discount cannot be negative!'} />
                    )}
                    
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Unit"
                              type="text"
                              label="Unit"
                              data={unitList}
                              formControlName={
                               input.unit
                              }
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              name='unit'
                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={2}
                            />
                            {(input.unit=='Unit' || input.unit=='') && (
                      <VError title={'Unit is required!'} />
                    )}
                     {localStorage.getItem('po_status')!='A' &&  <a className="my-2" onClick={()=>{setMode(5);setOpen(true)}}>
              <Tag  color="#4FB477">
                Not in list?
                </Tag>
                </a>}
                          </div>
                          <div className="sm:col-span-2">
                            <TDInputTemplate
                              placeholder="Unit price"
                              type="number"
                              label="Unit price"
                              formControlName={
                                input.unit_price
                              }
                              name='unit_price'
                              
                              handleChange={(event)=>handleDtChange(index,event)}
                              disabled={true}
                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {input.unit_price<=0 && (
                      <VError title={'Unit price should not be negative and non-zero!'} />
                    )}
                          </div>

                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="CGST"
                              type="number"
                              label="CGST"
                              formControlName={
                               input.CGST
                              }
                              name='CGST'
                disabled={localStorage.getItem('po_status')=='A'||itemList[index]['IGST']>0?true:false}

                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              data={cgstList}
                              mode={2}
                            />
                             {(((input.CGST=='CGST' || input.CGST=='') || (input.SGST=='SGST' || input.SGST==''))) && (input.IGST=='IGST' || input.IGST=='') && (
                      <VError title={'Either input IGST or SGST, CGST both!'} />
                    )}
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="SGST"
                              type="number"
                              label="SGST"
                disabled={localStorage.getItem('po_status')=='A' || itemList[index]['IGST']>0?true:false}

                              formControlName={
                                input.SGST
                              }
                              name='SGST'
                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              data={sgstList}
                              mode={2}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="IGST"
                              type="number"
                              label="IGST"
                disabled={localStorage.getItem('po_status')=='A' || (itemList[index]['CGST']>0 || itemList[index]['SGST'])>0 ?true:false}

                              formControlName={
                                input.IGST
                              }
                              name='IGST'
                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              data={igstList}
                              mode={2}
                            />
                            {/* {(((input.CGST=='CGST' || input.CGST=='') || (input.SGST=='SGST' || input.SGST==''))) && (input.IGST=='IGST' || input.IGST=='') && (
                      <VError title={'Either input IGST or SGST, CGST both!'} />
                    )} */}
                     {localStorage.getItem('po_status')!='A' &&  <a className="my-2" onClick={()=>{setMode(6);setOpen(true)}}>
              <Tag  color="#4FB477">
                Not in list?
                </Tag>
                </a>}
                          </div>
                          <div className="sm:col-span-2">
                            <TDInputTemplate
                              placeholder="Total"
                              type="number"
                              label="Total"
                              formControlName={
                                input.total
                              }
                              name='total'
                              handleChange={(event)=>handleDtChange(index,event)}
                              disabled={true}
                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              mode={1}
                            />
                            {/* {formik.errors.price_basis_desc && formik.touched.price_basis_desc && (
                      <VError title={formik.errors.price_basis_desc} />
                    )} */}
                          </div>
                          <div className="sm:col-span-2 flex flex-col">
                            <TDInputTemplate
                              placeholder="Delivery Date"
                              type="date"
                              label="Delivery Date"
                              formControlName={
                                input.delivery_date
                              }
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                              name='delivery_date'
                              handleChange={(event)=>handleDtChange(index,event)}

                              // handleChange={handleChange}
                              // handleBlur={handleBlur}
                              // formControlName={formik.values.price_basis_desc}
                              // handleChange={formik.handleChange}
                              // handleBlur={formik.handleBlur}
                              mode={1}
                            />
                            {!input.delivery_date && (
                      <VError title={'Date is required!'} />
                    )}
                          </div>
                       {index==itemList.length-1 &&   <div className="sm:col-span-2 font-bold flex flex-col justify-center items-end mt-4">
                            Grand Total: {grand_total>0?grand_total?.toFixed(2):0.00}
                          </div>}
                        </div>
                      </React.Fragment>
        )}
              <div className="flex pt-4 justify-between w-full">
                <button
                  className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
                  onClick={pressBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600" onClick={()=>{
                    var flag=0
                    console.log(itemList)
                    for(let i of itemList){
                      if(i.item_name!='Item name' && i.item_name!='' && i.qty>0 && i.rate>0 && i.unit!='Unit' && i.unit!='' && i.delivery_date && i.unit_price>0 && (i.disc>=0 || i.disc=='')
                        && 
                        ((i.SGST!='SGST' && i.SGST!='' && i.CGST!='CGST' && i.CGST!='') || (i.IGST!='IGST' && i.IGST!=''))
                      )
                        flag=0
                      else {
                        flag=1
                        break
                    }
                  }
                  if(flag==0)
                    pressNext(itemList)
                  
                  }}
                >
                  Next
                </button>
              </div>
      </div>
      </Spin>
      <DialogBox
        visible={visible}
        flag={9}
        data={{info:productInfo[0]}}
        onPress={() => setVisible(false)}
      />
      <DrawerComp open={open} flag={mode} onClose={()=>onClose()}/>

    </section>
  );
}

export default ProductDetails;
