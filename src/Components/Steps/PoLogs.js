import React, { useEffect, useState } from 'react'
import TDInputTemplate from '../TDInputTemplate';
import { Timeline } from 'antd';
import axios from 'axios';
import { Message } from '../Message';
import { url } from '../../Address/BaseUrl';
import { useParams } from 'react-router-dom';

function PoLogs({data}) {
    const [timeline,setTimeline]=useState(data)
    const [loading,setLoading]=useState(false)
    const params=useParams()
    const [comment,setComment]=useState("")
    const [count,setCount]=useState(0)
    const addcomment=()=>{
        setLoading(true)
        axios.post(url+'/api/addpocomments',{id:+params.id,comments:localStorage.getItem('po_comments'),user:localStorage.getItem('email')}).then(res=>{
          console.log(res)
          if(res.data.suc>0){
            setCount(prev=>prev+1)
            Message('success',res?.data?.msg)
            axios.post(url+'/api/getpocomments',{id:+params.id}).then(resCom=>{
                        setTimeline([])
                        console.log(resCom)
                        for(let i=0;i<resCom?.data?.msg?.length;i++){
                          timeline.push({
                            label:resCom?.data?.msg[i].created_at.toString().split('T').join(' '),
                            children:resCom?.data?.msg[i].proj_remarks+' by '+resCom?.data?.msg[i].created_by.toString()
                          })
                        }
                        setTimeline(timeline)
                    })
           
          }
        })
          setLoading(false)
      }
    // useEffect(()=>{
    //     axios.post(url+'/api/getpocomments',{id:+params.id}).then(resCom=>{
    //         setTimeline([])
    //         console.log(resCom)
    //         for(let i=0;i<resCom?.data?.msg?.length;i++){
    //           timeline.push({
    //             label:resCom?.data?.msg[i].created_at.toString().split('T').join(' '),
    //             children:resCom?.data?.msg[i].proj_remarks+' by '+resCom?.data?.msg[i].created_by.toString()
    //           })
    //         }
    //         setTimeline(timeline)
    //     })
    // },[count])
  return (
    <div className="grid grid-cols-2 gap-5 my-10">
    <div className="sm:col-span-1">
    {(localStorage.getItem('po_status')=='U' || localStorage.getItem('po_status')=='A' ) && <Timeline
             mode={'left'}
         items={timeline}
       />}
       </div>
       <div className="sm:col-span-1">
       {(localStorage.getItem('po_status')=='U' || localStorage.getItem('po_status')=='A' ) &&  <span className="sm:col-span-4">
            <TDInputTemplate
                         placeholder="Comments"
                         type="text"
                         label="Comments"
                         name="po_comments"
                         
                         formControlName={comment}
                         handleChange={(txt)=>{setComment(txt.target.value);localStorage.setItem('po_comments',txt.target.value)}}
                         mode={3}
   
                       /> 
                      <button  className="bg-green-900 hover:duration-500 w-full hover:scale-105  text-white p-1 my-3 rounded-full" onClick={()=>{setComment('');addcomment()}}> Add comment </button>
         
            </span>}
       </div>
        
 
     </div>
  )
}

export default PoLogs
