import React, { useEffect, useState } from "react";
import { routePaths } from "../../../Assets/Data/Routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { masterheaders } from "../../../Assets/Data/ColumnData";
import { url } from "../../../Address/BaseUrl";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';

import { Paginator } from 'primereact/paginator';
import { motion } from "framer-motion"
import nodata from '../../../../src/Assets/Images/nodata.png'
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    EditOutlined,
    FileTextOutlined,
    SyncOutlined,
  } from '@ant-design/icons';
  import { Tag } from 'antd';
  import SkeletonLoading from "../../../Components/SkeletonLoading";
  import CompositeSearch from "../../../Components/CompositeSearch";


function CancelView() {
  const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [loading,setLoading]=useState(false)
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const rdBtn=[{label:'Approved',value:1},{label:'Pending',value:2}]
    const locationpath = useLocation();
    const [value, setValue] = useState(0);
    const [po_data,setPoData] = useState([])
    const [vendors,setVendors]=useState([])
    const [vendorList,setVendorList]=useState([])
    const [projects,setProjects]=useState([])
    const [projectList,setProjectList]=useState([])
    const [copy,setCopy]=useState([])
    
    const navigate=useNavigate()
    var template =
      locationpath.pathname.split("/")[
        locationpath.pathname.split("/").length - 1
        
      ];
      console.log( locationpath.pathname.split("/")[
        locationpath.pathname.split("/").length - 1
      ])
    
    var templateData = masterheaders[template];
    useEffect(()=>{
      setLoading(true)
  
      setValue([locationpath.pathname.split("/")[
        locationpath.pathname.split("/").length - 1
      ]]=='P'?2:1)
      axios.post(url+'/api/getpo',{id:0}).then(res=>{
        console.log(res)
        setLoading(false)
      //   setPoData(res?.data?.msg)
        setCopy(res?.data?.msg.filter(e=>(e.po_status=='A')))
      setPoData(res?.data?.msg?.filter(e=>(e.po_status=='A')))
  
      //   if(locationpath.pathname.split("/")[
      //     locationpath.pathname.split("/").length - 1
      //   ]=='P'){
      //     setPoData(res?.data?.msg.filter(e=>(e.po_status!='A'&&e.po_status!='U'&&e.fresh_flag=='Y')))
      //   }
      //   else{
      //     setPoData(res?.data?.msg.filter(e=>(e.po_status=='A' || e.po_status=='U' &&e.fresh_flag=='Y')))
  
      //   }
      }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
    },[locationpath.pathname.split("/")[
      locationpath.pathname.split("/").length - 1
    ]])
    useEffect(() => {
      localStorage.removeItem("id");
      localStorage.removeItem("po_issue_date");
      localStorage.removeItem("po_status");
      localStorage.removeItem("po_no")
      localStorage.removeItem("po_comments");
      localStorage.removeItem("order_id");
      localStorage.removeItem("order_date");
      localStorage.removeItem("order_type");
      localStorage.removeItem("proj_name");
      localStorage.removeItem("vendor_name");
      localStorage.removeItem("itemList");
      localStorage.removeItem("terms");
      localStorage.removeItem("termList");
      localStorage.removeItem("ship_to");
      localStorage.removeItem("bill_to");
      localStorage.removeItem("ware_house_flag");
      localStorage.removeItem("notes");
      localStorage.removeItem("mdcc_flag");
      localStorage.removeItem("mdcc");
      localStorage.removeItem("insp_flag");
      localStorage.removeItem("insp");
      localStorage.removeItem("drawing_flag");
      localStorage.removeItem("drawing");
      localStorage.removeItem("dt");
    }, [
      // locationpath.pathname.split("/")[
      //   locationpath.pathname.split("/").length - 1
      // ],
    ]);
   useState(()=>{
     axios.post(url+'/api/getvendor',{id:0}).then(res=>{
      console.log(res);
      setVendors(res?.data.msg)
      vendorList.length=0
      setVendorList([])
      for(let i of res?.data?.msg){
        vendorList.push({
          name:i.vendor_name,
          code:i.sl_no
        })
      }
      setVendorList(vendorList)
    
    
    }).catch(err=>{console.log(err); navigate('/error'+'/'+err.code+'/'+err.message)});
     axios.post(url+'/api/getproject',{id:0}).then(res=>{
      console.log(res);
      setProjects(res?.data.msg)
      setProjectList([])
      projectList.length=0
      for(let i of res?.data?.msg){
        projectList.push({
          name:i.proj_name,
          code:i.sl_no
        })
      }
      setProjectList(projectList)
    
    })
   },[])
    const setSearch=(word)=>{
      setValue(0)
      setPoData(copy?.filter(e=>(e?.po_no?.toLowerCase().includes(word?.toLowerCase()) || e?.vendor_name?.toLowerCase().includes(word?.toLowerCase()) || e?.proj_name?.toLowerCase().includes(word?.toLowerCase())  || e?.po_issue_date?.toLowerCase().includes(word?.toLowerCase()) ||e?.created_by?.toLowerCase().includes(word?.toLowerCase()))))
  
    }
    const onAdvSearch=(val1,val2)=>{
      console.log(val1,val2)
      setValue(0)
      setPoData(copy?.filter(e=>(e?.vendor_name?.toLowerCase().includes(val1?.toLowerCase()) &&  e?.proj_name?.toLowerCase().includes(val2?.toLowerCase()))))
    }
    return (
      //     locationpath.pathname.split("/")[
      //       locationpath.pathname.split("/").length - 1
      //     ]=='P' ?  <MasterViewTemplate
      //     to={routePaths.PURCHASEORDERFORM}
      //     templateData={templateData}
      //     template={template}
      //     _url={"/api/getpopending"}
      //   />: <MasterViewTemplate
      //   to={routePaths.PURCHASEORDERFORM}
      //   templateData={templateData}
      //   template={template}
      //   _url={"/api/getpoapproved"}
      // />
      // <>
      //   <Radio.Group onChange={onChange} className="my-4" value={value}>
      //     <Radio value={1}>Approved/Unapproved</Radio>
      //     <Radio value={2}>Others</Radio>
      //   </Radio.Group>
      //   <MasterViewTemplate
      //     to={routePaths.PURCHASEORDERFORM}
      //     templateData={templateData}
      //     template={template}
      //     _url={value == 1 ? "/api/getpoapproved" : "/api/getpopending"}
      //   />
      // </>
     <>
    
      <div className="flex items-center  justify-end h-14 -mt-[72px] w-auto dark:bg-[#22543d] md:flex-row space-y-3 md:space-y-0 rounded-lg">
       
          {/* <motion.button initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3, type: 'just' }}  className={'bg-white border-2 border-l-0 text-green-900 font-semibold text-lg rounded-full p-1 shadow-lg'}>
          <Tooltip title="Print this table" arrow>
          <PrinterOutlined />
          </Tooltip>
          </motion.button> */}
        </div>
      <div className="flex justify-end items-center">
      
       <CompositeSearch data={{set_one:vendorList,set_two:projectList,set_one_lbl:'Vendors',set_two_lbl:'Projects'}} onReset={()=>{setPoData(copy);setValue(0)}} onSubmit={(values)=>{console.log(values); onAdvSearch(values.val_one,values.val_two)}}/>
      </div>
     
    {loading && <SkeletonLoading/>}
  
       {copy.length>0 && !loading &&
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1}} transition={{ delay: 0.5, type: 'spring', stiffness: 30}}>
       <div className="flex flex-col p-1 bg-green-900 rounded-full my-3 dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 ">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <motion.h2 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, type: 'just' }} className="text-xl w-48 capitalize text-nowrap font-bold text-white dark:text-white sm:block hidden mx-5">
                      Cancel Order
                    </motion.h2>
  
                    <label for="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full -right-6 2xl:-right-12">
                      <div className="absolute inset-y-0 left-0 flex items-center md:ml-4 pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd" />
                        </svg>
                      </div>
                      <motion.input
                        type="text"
                        id="simple-search"
                        initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '95%' }} transition={{ delay: 1.1, type: 'just' }}
                        className="bg-white border rounded-full border-emerald-500 text-gray-800 text-sm  block w-full  pl-10 dark:bg-gray-800 md:ml-4  duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                        required=""
                        onChange={(text) => setSearch(text.target.value)}
                         />
                    </div>
                    {/* {btnText &&  <motion.div  initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:1.3, type:'just'}} className="w-full hidden md:block  md:w-auto sm:flex sm:flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <Tooltip title={btnText}>
                    <Link to={to+0}
                      type="submit"
                     className="flex items-center justify-center text-green-900 bg-white hover:bg-primary-800  font-medium rounded-full transition ease-in-out hover:-translate-x-1 hover:scale-110 text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:hover:bg-primary-700 focus:outline-none  hover:duration-500 hover:shadow-lg dark:focus:ring-primary-800 "
                    
      
                    >
                      <AddIcon /> {btnText}
                    </Link>
                  </Tooltip>
                </motion.div>} */}
                    {/* <div className='p-1'>
                      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                        <MoreOutlined className='flex items-center justify-center  text-white   rounded-full  text-3xl font-bold px-2 h-10 w-10 py-2 dark:text-white focus:outline-none  transition duration-0 hover:duration-500 dark:focus:ring-primary-800' />
                      </Dropdown>
  
                    </div> */}
                  </div>
                </div>
              </div>
              </motion.section>
  }
  {
    copy.length==0 && loading==false &&
    
    <div className='flex-col ml-72 mx-auto justify-center items-center'>
    <motion.img initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1, type:'spring'
                  }} src={nodata} className="h-96 w-96 2xl:ml-48 2xl:h-full" alt="Flowbite Logo" />
              <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1, type:'spring'
                  }} className="h-12 text-green-900 -mt-16 ml-9 2xl:ml-48 2xl:h-24 font-bold">Please create something to view data here!!</motion.h2>
          </div> 
  }
  <div class="relative overflow-x-auto">
    {!loading &&   <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1}} transition={{ delay: 0.5, type: 'spring', stiffness: 30}}>
    <table class="w-full text-sm text-left rtl:text-right shadow-lg text-green-900dark:text-gray-400">
          <thead class=" text-md  text-gray-700 capitalize   bg-[#C4F1BE] dark:bg-gray-700 dark:text-gray-400">
              <tr >
                  <th scope="col" class="p-4">
                      #
                  </th>
                  <th scope="col" class="p-4">
                      PO No.
                  </th>
                  <th scope="col" class="p-4">
                      Date
                  </th>
                  <th scope="col" class="p-4">
                      Vendor 
                  </th>
                  <th scope="col" class="p-4">
                      Project 
                  </th>
                  <th scope="col" class="p-4">
                      Status 
                  </th>
                  <th scope="col" class="p-4">
                      Created By 
                  </th>
                  <th scope="col" class="p-4">
                      Action 
                  </th>
              </tr>
          </thead>
          <tbody>
             {po_data && po_data?.slice(first,rows+first).map(item=> 
             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.serial_number} 
                  </th>
                  <td class="px-6 py-4">
                      {item.po_no}
                  </td>
                  <td class="px-6 py-4">
                      {item.po_issue_date}
                  </td>
                  <td class="px-6 py-4">
                      {item.vendor_name}
                  </td>
                  <td class="px-6 py-4">
                      {item.proj_name} 
                      {/* {item.fresh_flag} */}
                  </td>
                  <td class="px-6 py-4">
                      {item.po_status=='P'?<Tag className="text-[12px] p-1 rounded-full w-36" icon={<SyncOutlined spin />} color="processing">In Progress<Tooltip title="Draft saved"> <FileTextOutlined className="text-red-500 ml-7" /></Tooltip> </Tag>:(item.po_status=='A'? <Tag className="text-[12px] p-1 rounded-full w-36" icon={<CheckCircleOutlined />} color="success">Approved</Tag>:(item.po_status=='U'?<Tag className="text-[12px] p-1 rounded-full w-36" icon={<ClockCircleOutlined className="animate-pulse"/>} color="error">Pending Approval</Tag>:(item.po_status=='D'?<Tag className="text-[12px] p-1 rounded-full w-36" icon={<CheckCircleOutlined />} color="success">Delivered</Tag>:<Tag className="text-[12px] p-1 rounded-full w-36" icon={<CheckCircleOutlined />} color="success"> Partially Delivered </Tag>)))}
                  </td>
                  <td class="px-6 py-4">
                      {item.created_by}
                  </td>
                  <td class="px-6 py-4">
                    <Link to={routePaths.CANCELFORM+item.sl_no}>
                  <EditOutlined className="text-md text-green-900" />
                  </Link>
                  </td>
              </tr>
             )}
               {/* <Paginator className="w-full" first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} /> */}
          </tbody>
          
      </table>
      <Paginator first={first} rows={rows} totalRecords={po_data?.length} rowsPerPageOptions={[3,5,10, 15, 20, 30,po_data?.length ]} onPageChange={onPageChange} />
      </motion.section>
      }
      
  </div>
     
     </> 
     
  
    );
}

export default CancelView
