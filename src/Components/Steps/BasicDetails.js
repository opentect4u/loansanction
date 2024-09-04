import React, { useEffect, useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import VError from "../../Components/VError";
import { useParams } from "react-router-dom";
import { url } from "../../Address/BaseUrl";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import Viewdetails from "../Viewdetails";
import DialogBox from "../DialogBox";
import moment from 'moment'
import DrawerComp from "../DrawerComp";
import { Tag } from 'antd';
function BasicDetails({ pressNext, pressBack, data }) {
  console.log(data)
  const params = useParams();
  const [projectList, setProjectList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorsList, setVendorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(data.type);
  const [proj_name, setProjName] = useState(data.proj_name);
  const [order_id, setOrderId] = useState(data.order_id);
  const [order_date, setOrderDate] = useState(data.order_date);
  const [vendor_name,setVendorName]=useState(data.vendor_name)
  const [po_issue_date,setPoIssueDate]=useState(data.po_issue_date)
  const [bank,setBank]=useState([])
  const [visible,setVisible]=useState(false)
  const [projectInfo,setProjectInfo]=useState([])
  const [vendorInfo,setVendorInfo]=useState([])
  const [pocList,setPoc]=useState([])
  const [deals,setDeals]=useState([])
  const [vendorPocList,setPocList]=useState([])
  const [flag,setFlag]=useState(0)
  const [val,setVal]=useState()
  const [po_no,setPoNo]=useState(data.po_no)
  const [open, setOpen] = useState(false);
  const [mode,setMode] = useState(0)
  const [count,setCount]=useState(0)
  const [checkLoad,setCheckLoad]=useState(false)
const showDrawer = () => {
  setOpen(true);
};
const checkid=()=>{
  if(po_no){
  setCheckLoad(true)
  axios.post(url+'/api/check_po_no',{po_no:po_no}).then(res=>{
    console.log(res.data.msg[0].count)
    setCheckLoad(false)
    setCount(res.data.msg[0].count)
  
  })
}
}
const onClose = () => {
  setOpen(false);
  if(mode==1){
  setLoading(true)

    vendorsList.length=0
    setVendorList([])
    axios.post(url + "/api/getvendor", { id: 0 }).then((resVendor) => {
      setVendorList(resVendor?.data?.msg);
      setVendors(resVendor?.data?.msg)
      for (let i = 0; i < resVendor?.data?.msg?.length; i++) {
        vendorsList.push({
          name: resVendor?.data?.msg[i].vendor_name,
          code: resVendor?.data?.msg[i].sl_no,
        });
      }
      setLoading(false)
    setVendorList(vendorsList);
  })
}
if(mode==2){
  projectList.length=0
  setProjects([])
  setLoading(true)
  axios.post(url + "/api/getproject", { id: 0 }).then((resProj) => {
    setProjects(resProj?.data?.msg);
    for (let i = 0; i < resProj?.data?.msg?.length; i++) {
      projectList.push({
        name: resProj?.data?.msg[i].proj_name,
        code: resProj?.data?.msg[i].sl_no,
      });
    }
    setProjectList(projectList);
    setLoading(false)
})}

};
  console.log(params.id,params.flag);
  const onSubmit = () => {

    console.log(type,proj_name,order_id,order_date,vendor_name);
    if(type!='P'){
    if(type && vendor_name ){
      if(params.flag=='E'){
      if(po_no && count==0){
        setVal({type:type,proj_name:proj_name,order_date:order_date,order_id:order_id,vendor_name:vendor_name,po_no:po_no});
        pressNext(val)
      }
      }
      else{
      setVal({type:type,proj_name:proj_name,order_date:order_date,order_id:order_id,vendor_name:vendor_name,po_no:po_no});
      pressNext(val)
      }
    }
  }
  else{
    if(type && vendor_name && proj_name){
      if(params.flag=='E'){
        if(po_no){
          setVal({type:type,proj_name:proj_name,order_date:order_date,order_id:order_id,vendor_name:vendor_name,po_no:po_no});
          pressNext(val)
        }
        }
        else{
        setVal({type:type,proj_name:proj_name,order_date:order_date,order_id:order_id,vendor_name:vendor_name,po_no:po_no});
        pressNext(val)
        }
      
      }
      
  }
  };
  useEffect(()=>{
    setProjName(localStorage.getItem('proj_name'))
    setVendorName(localStorage.getItem('vendor_name'))
    setOrderDate(localStorage.getItem('order_date'))
    setOrderId(localStorage.getItem('order_id'))
    setType(localStorage.getItem('order_type'))
    setPoIssueDate(localStorage.getItem('po_issue_date'))
    setPoNo(localStorage.getItem('po_no'))
  },[data.type])
  useEffect(() => {
    setLoading(true);
    setVendorList([])
    setVendors([])
    setProjects([])
    setProjectList([])
    const date = new Date();
    console.log(date); 
    if(params.id==0)
    {setPoIssueDate(moment(date).format('yyyy-MM-DD'));localStorage.setItem('po_issue_date',moment(date).format('yyyy-MM-DD'))}
    axios.post(url + "/api/getproject", { id: 0 }).then((resProj) => {
      console.log(resProj)
      setProjects(resProj?.data?.msg);
      for (let i = 0; i < resProj?.data?.msg?.length; i++) {
        projectList.push({
          name: resProj?.data?.msg[i].proj_name,
          code: resProj?.data?.msg[i].sl_no,
        });
      }
      setProjectList(projectList);
      axios.post(url + "/api/getvendor", { id: 0 }).then((resVendor) => {
        setVendorList(resVendor?.data?.msg);
        setVendors(resVendor?.data?.msg)
        for (let i = 0; i < resVendor?.data?.msg?.length; i++) {
          vendorsList.push({
            name: resVendor?.data?.msg[i].vendor_name,
            code: resVendor?.data?.msg[i].sl_no,
          });
        }
      setVendorList(vendorsList);
      setVendorInfo(resVendor?.data?.msg?.filter(e=>e.sl_no==data.vendor_name))
      setProjectInfo(resProj?.data?.msg.filter((e) => e.sl_no == +data.proj_name))
      console.log(resProj?.data?.msg.filter((e) => e.sl_no == +data.proj_name),data.proj_name,'projectinfo',resProj,resVendor)
      
      })
     
      setLoading(false);

    });
    
    console.log(data)
    // if(localStorage.getItem('proj_name')!=null){
     console.log(localStorage.getItem('proj_name'),localStorage.getItem('vendor_name'),data.proj_name,data.vendor_name)
    //  if(localStorage.getItem('proj_name') && localStorage.getItem('vendor_name')){
    //   debugger
      if(data.proj_name && data.vendor_name){
        setLoading(true)
      //   axios.post(url + "/api/getprojectpoc", { id: projects.filter((e) => e.sl_no == +data.proj_name)[0]?.proj_id}).then((res) => {
      //     console.log(res)
      //     setPoc(res?.data?.msg)
      //     setLoading(false)
      // })
      
      axios.post(url+'/api/getvendorpoc',{id:+data?.vendor_name?+data?.vendor_name:+localStorage.getItem('vendor_name')}).then((resPoc)=>{
        console.log(resPoc)
        setPocList(resPoc?.data?.msg)
        axios.post(url+'/api/getvendordealsinfo',{id:+data?.vendor_name?+data?.vendor_name:localStorage.getItem('vendor_name')}).then(resDeals=>{
          console.log(resDeals)
          setDeals(resDeals?.data?.msg)
          axios.post(url+'/api/getvendorbank',{id:+data?.vendor_name?+data?.vendor_name:localStorage.getItem('vendor_name')}).then(resBank=>{
            setBank(resBank?.data?.msg)
          setLoading(false)
        })
        
      })
    })
  }
    // }
  }, []);
  const onSelectProject = (event) => {
    console.log(event.target.value)
    console.log(projects.filter((e) => e.sl_no == event.target.value))
    setProjectInfo(projects.filter((e) => e.sl_no == event.target.value))
    setOrderDate(projects.filter((e) => e.sl_no == event.target.value)[0]
        .order_date)
    localStorage.setItem('order_date',projects.filter((e) => e.sl_no == event.target.value)[0]
    .order_date)
    setOrderId(projects.filter((e) => e.sl_no == event.target.value)[0]
        .order_id)
      localStorage.setItem('order_id',projects.filter((e) => e.sl_no == event.target.value)[0]
      .order_id)
        setLoading(true)
        axios.post(url + "/api/getprojectpocinfo", { id: projects.filter((e) => e.sl_no == event.target.value)[0]
          .proj_id}).then((res) => {
          console.log(res)
          setPoc(res?.data?.msg)
          setLoading(false)
      })
  };
 
  const onSelectVendor=(event)=>{
    console.log(event.target.value)
    setLoading(true)
    axios.post(url+'/api/getvendorpoc',{id:event.target.value}).then((resPoc)=>{
      console.log(resPoc)
      setPocList(resPoc?.data?.msg)
      axios.post(url+'/api/getvendordealsinfo',{id:event.target.value}).then(resDeals=>{
        console.log(resDeals)
        setDeals(resDeals?.data?.msg)
        axios.post(url+'/api/getvendorbank',{id:event.target.value}).then(resBank=>{
          setBank(resBank?.data?.msg)
        setLoading(false)
      })
      })
      
    })
  }
  return (
    <section className="bg-white dark:bg-[#001529]">
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className="text-green-900 dark:text-gray-400"
        spinning={loading}
      >
        <div className="py-2 px-4 mx-auto w-full lg:py-2">
          <h2 className="text-2xl text-green-900 font-bold my-3">
            Basic Details
          </h2>

          <div className="grid gap-4 sm:grid-cols-6 sm:gap-6">
          <div className="sm:col-span-3">
              <TDInputTemplate
                placeholder="PO Date"
                type="date"
                label="PO Date"
                name="po_issue_date"
                disabled={params.flag=='F'||localStorage.getItem('po_status')=='A'?true:false}
                formControlName={po_issue_date}
                max={moment(new Date()).format('yyyy-MM-DD')} //may need to change
                handleChange={(txt) => 
                  {setPoIssueDate(txt.target.value)
                  localStorage.setItem('po_issue_date',txt.target.value)
                }
                }
                mode={1}
              />
              {/* {formik.errors.order_type && formik.touched.order_type && (
            <VError title={formik.errors.order_type} />
          )} */}
            </div>
            <div className="sm:col-span-3">
              <TDInputTemplate
                placeholder="Order type"
                type="text"
                label="Order type"
                name="order_type"
                data={[
                  { name: "General", code: "G" },
                  { name: "Project Specific", code: "P" },
                ]}
                formControlName={type}
                handleChange={(txt) => 
                  {setType(txt.target.value)
                  localStorage.setItem('order_type',txt.target.value)
                }
                }
                mode={2}
                disabled={localStorage.getItem('po_status')=='A' ?true:false}

              />
              {!type && (
            <VError title={'Select type!'} />
          )}
            </div>
          {params.flag=='E' && <div className="sm:col-span-6">
              <TDInputTemplate
                placeholder="PO No."
                type="text"
                label="PO No."
                name="po_no"
               
                formControlName={po_no}
                handleBlur={()=>checkid()}
                handleChange={(txt) => 
                  {setPoNo(txt.target.value)
                  localStorage.setItem('po_no',txt.target.value)
                }
                }
                mode={1}
                disabled={localStorage.getItem('po_status')=='A' ||(params.id>0 && po_no) ?true:false}

              />
              { (params.flag=='E' && !po_no) && (
            <VError title={'Po Number is required!'} />
          )}
           {checkLoad &&  <Tag icon={<SyncOutlined spin />} color="processing">Checking...</Tag>}
                    {count>0 && <VError title={'PO No. already exists!'} />}
            </div>}
           {type=='P' &&
           <>
           
           <div className="sm:col-span-6">
              <TDInputTemplate
                placeholder="Project name"
                type="text"
                label="Project Name"
                name="project_name"
                data={projectList}
                formControlName={proj_name}
                handleChange={(event) => {
                  localStorage.setItem('proj_name',event.target.value)
                  setProjName(event.target.value=='Project name'?'':event.target.value)
                  if(event.target.value!='Project name')
                    {onSelectProject(event)}
                    else{
                      setOrderId('');setOrderDate('')
                    }
                }}
                mode={2}
                disabled={localStorage.getItem('po_status')=='A' ?true:false}

              />
              
               {/* <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      placeholder="input here"
      options={projectList}
    /> */}
             <div className={proj_name?'flex justify-between':'flex justify-end'}>
             {proj_name && <Viewdetails click={()=>{
              setFlag(7);
              console.log(proj_name);
              setProjectInfo(projects.filter(e=>e.sl_no==proj_name))
              axios.post(url + "/api/getprojectpocinfo", { id: projects.filter((e) => e.sl_no == +proj_name)[0]?.proj_id}).then((res) => {
                console.log(res)
                setPoc(res?.data?.msg)
                setLoading(false)
            })
              setVisible(true)}}/>}
             {!proj_name && type=='P' && (
            <VError title={'Project is required!'} />
          )}
          {localStorage.getItem('po_status')!='A' &&<a className="my-1" onClick={()=>{setMode(2);setOpen(true)}}>
              
              <Tag color="#4FB477">Not in list?</Tag>
              </a>
}
              {/* <p>Not in list?</p> */}
             </div>
             
            </div>
            <div className="sm:col-span-0 hidden">
              <div className="flex flex-col">
                <TDInputTemplate
                  placeholder="Client Order date"
                  type="date"
                  label="Client Order Date"
                  name="order_date"
                  formControlName={order_date}
                  disabled={true}
                  mode={1}

                />
                {/* {formik.errors.order_date && formik.touched.order_date && (
                  <VError title={formik.errors.order_date} />
                )} */}
              </div>
            </div>
            <div className="sm:col-span-0 hidden">
              <div className="flex flex-col">
                <TDInputTemplate
                  placeholder="Client Order No."
                  type="text"
                  label="Client Order No."
                  name="order_no"
                  formControlName={order_id}
                  disabled={true}
                  mode={1}
                />
                {/* {formik.errors.order_no && formik.touched.order_no && (
                  <VError title={formik.errors.order_no} />
                )} */}
              </div>
            </div>
           </>
            }
            <div className="sm:col-span-6">
              <TDInputTemplate
                placeholder="Vendor name"
                type="text"
                label="Vendor name"
                name="vendor_name"
                data={vendorsList}
                formControlName={vendor_name}
                handleChange={(event)=>{
                  setVendorName(event.target.value)
                  if(event.target.value!='Vendor name')
                    {onSelectVendor(event)
                    localStorage.setItem('vendor_name',event.target.value)
                  setVendorInfo(vendors?.filter(e=>e.sl_no==event.target.value))
                    }
                  else{
                    setVendorName('')
                  }

                }}
                // handleBlur={formik.handleBlur}
                disabled={localStorage.getItem('po_status')=='A' ?true:false}

                mode={2}
              />
              {!vendor_name && (
                <VError title={'Vendor is required!'} />
              )}
              <div className={vendor_name?'flex justify-between':'flex justify-end'}>
              {vendor_name && <Viewdetails click={()=>{
                setVisible(true)
                setVendorInfo(vendors?.filter(e=>e.sl_no==vendor_name))
                
                axios.post(url+'/api/getvendorpoc',{id:+data?.vendor_name?+data?.vendor_name:+localStorage.getItem('vendor_name')}).then((resPoc)=>{
                  console.log(resPoc)
                  setPocList(resPoc?.data?.msg)
                  axios.post(url+'/api/getvendordealsinfo',{id:+data?.vendor_name?+data?.vendor_name:localStorage.getItem('vendor_name')}).then(resDeals=>{
                    console.log(resDeals)
                    setDeals(resDeals?.data?.msg)
                    axios.post(url+'/api/getvendorbank',{id:+data?.vendor_name?+data?.vendor_name:localStorage.getItem('vendor_name')}).then(resBank=>{
                      setBank(resBank?.data?.msg)
                    setLoading(false)

                    setFlag(8);
                  })
                  
                })
              })
                }}/>}
              {localStorage.getItem('po_status')!='A' && <a className="my-2" onClick={()=>{setMode(1);setOpen(true)}}>
              <Tag  color="#4FB477">
                Not in list?
                </Tag>
                </a>}
              </div>
            
              
            </div>
          </div>
          <div className="flex pt-4 justify-end">
            {/* <button
              className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
              onClick={pressBack}
            >
              Back
            </button> */}
            <button
              type="submit"
              className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
              onClick={()=>onSubmit()}
            >
              Next
            </button>
          </div>
        </div>
      </Spin>
      <DialogBox
        visible={visible}
        flag={flag}
        data={flag==7?{info:projectInfo[0],poc:pocList}:{info:vendorInfo[0],deals:deals,poc:vendorPocList,bank:bank}}
        onPress={() => setVisible(false)}
      />
      <DrawerComp open={open} flag={mode} onClose={()=>onClose()}/>
    </section>
  );
}

export default BasicDetails;
