import React, { useEffect, useState } from 'react'
import AmendPreview from '../../../Components/AmendPreview'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../../Address/BaseUrl'
import SkeletonLoading from '../../../Components/SkeletonLoading'
import { Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, PrinterOutlined, SyncOutlined } from '@ant-design/icons'
import TDInputTemplate from '../../../Components/TDInputTemplate'
import HeadingTemplate from '../../../Components/HeadingTemplate'
import { Accordion, AccordionTab } from 'primereact/accordion';
import DialogBox from '../../../Components/DialogBox'
import { Fab } from '@mui/material'
function CancelForm() {
  const params=useParams()
  const [po_info,setInfo]=useState([])
  const [loading,setLoading]=useState(false)
  const [offset, setOffset] = useState(0);
  const [visible,setVisible]=useState(false)
  const [reason,setReason]=useState('')
  useEffect(()=>{
    setLoading(true)
    axios.post(url+'/api/getpo',{id:params.id}).then(res=>{
      console.log(res)
      setInfo(res?.data?.msg)
      setLoading(false)
    })
  },[])
 
  const deleteItem=()=>{

  }
  return (
    <>
     <HeadingTemplate
        text={"Cancel Order"}
        mode={1}
        title={'Vendor'}
        data={''}
      />
   {loading? <SkeletonLoading/> :
   <Accordion activeIndex={0}>
   <AccordionTab header="Cancellation Information" className='z-10 sticky top-16'>
   <div id='divA' className='flex flex-col gap-2  mb-2 overflow-y-hidden'> 
   <div className="flex gap-5 justify-end">
     
     <Fab color="success" size="small" aria-label="add" >
        <PrinterOutlined />
      </Fab>
     </div>
 <div className='bg-white p-4 rounded-2xl shadow-lg grid grid-cols-6 items-center mb-2'>
 <p className='block  text-md col-span-2 h-auto p-2 border-2 border-gray-200 capitalize font-bold text-green-900 dark:text-gray-100'>PO No.: <span className='text-gray-800 text-sm font-bold normal-case'> {po_info?.po_no}</span></p>
  <p className='block  text-md col-span-2 h-auto p-2 border-2 border-l-0 border-gray-200 capitalize font-bold text-green-900 dark:text-gray-100'>Created By: <span className='text-gray-800 text-sm font-bold normal-case'> {po_info?.created_by}</span></p>
  <p className='block  text-md col-span-2 h-auto p-2 border-l-0 border-2 border-gray-200 capitalize font-bold text-green-900 dark:text-gray-100'>Created At: <span className='text-gray-800 text-sm font-bold normal-case'>{po_info?.created_at?.split('T')[0]} {po_info?.created_at?.split('T')[1] } </span></p>
  <p className='block  text-md col-span-2  p-2 border-2 border-t-0  border-gray-200  capitalize font-bold text-green-900 dark:text-gray-100'>Status:

  {po_info?.po_status=='C'? <Tag bordered={false} className="text-base" color="error" icon={<CloseCircleOutlined />}>
      Cancelled
    </Tag>:<Tag bordered={false}  icon={<CheckCircleOutlined />} className="text-base" color="green">
     Approved
    </Tag>
}
  </p>
  <p className='block  text-md col-span-2 p-2 border-2 border-t-0 border-l-0 border-gray-200  capitalize font-bold text-green-900 dark:text-gray-100'>Approved By:</p>
  <p className='block  text-md col-span-2 p-2 border-2 border-l-0 border-t-0 border-gray-200  capitalize font-bold text-green-900 dark:text-gray-100'>Approved At:</p>

  <p className='block  text-md col-span-2 p-2 border-2 border-t-0 border-gray-200  capitalize font-bold text-green-900 dark:text-gray-100'>Cancelled By:</p>
  <p className='block text-md col-span-4 p-2 border-t-0 border-l-0 border-2 border-gray-200 capitalize font-bold text-green-900 dark:text-gray-100'>Cancelled At:</p>
  <p className='block mb-2 text-md col-span-6  border-t-0 text-wrap  p-2 border-2 border-gray-200 capitalize font-bold text-green-900 dark:text-gray-100'>Reason for cancellation:
  <span className='text-gray-800 text-sm font-bold normal-case text-wrap max-w-full'> {reason}</span>

  {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
  </p>
  {po_info?.po_status=='A' && <>
  <div className="sm:col-span-6">
              <TDInputTemplate
                placeholder="Reason for cancellation"
                label="Reason for cancellation"
                name="res_can"
                formControlName={reason}
                handleChange={txt=>setReason(txt.target.value)}
                // handleBlur={formik.handleBlur}
                mode={3}
              />
              {/* {formik.errors.prod_des && formik.touched.prod_des ? (
                <VError title={formik.errors.prod_des} />
              ) : null} */}
            </div>
 
            <div className='flex justify-center sm:col-span-6'>
<button
      type="submit"
      className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
       onClick={()=>setVisible(true)}
  >
      <CloseCircleOutlined className='mr-2' />
      Cancel
  </button>
</div>
  
  </>
  
}


</div>
</div>
   </AccordionTab>
   </Accordion>
   
  }
    <div id="divB" className='bg-white px-1 py-4 rounded-2xl shadow-lg flex justify-start gap-0 relative'>
      
      <div >
      <AmendPreview id={params.id}/>
      </div>
     
    </div>
    <DialogBox
        visible={visible}
        flag={reason==''?13:12}
        onPress={() => setVisible(false)}
        onDelete={()=>deleteItem()}
      />
    </>
   
  )
}

export default CancelForm
