const express = require('express'),
credit_managerRouter = express.Router(),
dateFormat = require('dateformat');
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');
const { db_Select, db_Insert } = require('../model/mysqlModel');

credit_managerRouter.post("/credit_manager_login", async (req, res) =>{
    var data = req.body;
    console.log(data,'brn_data');
    
    var select = '*',
    table_name = 'md_users',
    whr = `email = '${data.mng_email}'`,
    order = null;
    var res_dt = await db_Select(select, table_name, whr, order);

    if (res_dt.suc > 0) {
      if (res_dt.msg.length > 0) {
        if (await bcrypt.compare(data.pass.toString(), res_dt.msg[0].password)) {
          res.send({ suc: 1, msg: "Credit Manager login successful", user_dtls: res_dt.msg[0] });
        } else {
          result = {
            suc: 0,
            msg: "Please check your userid or password",
          };
          res.send(result)
        }
        } else {
          result = { suc: 2, msg: "No data found", dt: res_dt };
          res.send(result)
        }
      }  else {
        result = { suc: 0, msg: res_dt.msg, dt: res_dt };
        res.send(result)
      }
});

module.exports = { credit_managerRouter}

// *******************************************************************************************************

credit_managerRouter.get("/fetch_credit_pen_dtls", async (req, res) => {
  var data = req.query;

var select = 'max(a.forwarded_dt) last_fwd_dt,a.application_no,b.member_name',
table_name = 'td_forward a,td_loan_application b',
whr = `a.application_no = b.application_no AND a.forwarded_to = '${data.user_id}' ${data.application_no > 0 ? `AND a.application_no=${data.application_no}` : ''}`,
order = `Group by a.application_no,b.member_name`;
var dt = await db_Select(select,table_name,whr,order)


if(data.application_no > 0){
if(dt.suc > 0 && dt.msg.length > 0){
var select = `a.*,b.*,d.branch_name,e.loan_type loan_type_name,e.sl_no loan_type`,
table_name = 'td_loan_application a, td_forward b, md_branch d, md_loan_type e',
whr =  `a.application_no = b.application_no 
  AND a.branch_code = d.sl_no
  AND a.loan_type = e.sl_no
  AND  a.application_no = '${data.application_no}'
  AND  b.forwarded_to = '${data.user_id}'
  AND b.forwarded_dt = '${dateFormat(new Date(dt.msg[0].last_fwd_dt), "yyyy-mm-dd HH:MM:ss")}'`,
order = `ORDER BY a.created_by`;
var res_dt = await db_Select(select, table_name, whr, order)
// console.log(res_dt,'res');
dt.msg[0]['pending_dtls'] = res_dt.suc > 0 ? res_dt.msg : []

var select = `@a:=@a+1 sl_no,b.remarks,b.forwarded_dt, CONCAT(c.first_name, ' ', c.last_name) fwd_name, CONCAT(d.first_name, ' ', d.last_name) fwd_to_name,b.application_status`,
table_name = "(SELECT @a:= 0) AS a, td_forward b, md_users c,  md_users d",
whr = `b.forwarded_by=c.id AND  b.forwarded_to=d.id AND b.application_no = '${data.application_no}'`,
order = `ORDER BY b.forwarded_dt`;
var reject_dt = await db_Select(select, table_name, whr, order);

dt.msg[0]["reject_dt"] = reject_dt.suc > 0 ? (reject_dt.msg.length > 0 ? reject_dt.msg : []) : [];
}
} 

res.send(dt)
});

// ********************************************************************************************************

credit_managerRouter.post("/credit_manager_reject", async (req, res) =>{
  var data = req.body;
  console.log(data,'dd');
  datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  var select = "a.sl_no",
  table_name = "td_forward a",
  where = `a.application_no = '${data.application_no}' AND a.forwarded_to = '${data.user_id}' AND a.forwarded_dt = (SELECT MAX(b.forwarded_dt) FROM td_forward b WHERE b.application_no = a.application_no AND b.forwarded_to = a.forwarded_to)`,
  order = null;
  var branch_data = await db_Select(select,table_name,where,order);
  
  var table_name = "td_forward",
  fields = "(application_no, forwarded_dt, forwarded_by, by_brn, forwarded_to, to_brn, application_status, remarks, created_by, created_dt)",
  values =  `('${data.application_no}', '${datetime}', '${data.user_id}', '${data.fwd_brn}', '${data.loan_appr_id}', '${data.brn_code}', 'P', '${data.brn_remarks}', '${data.user_id}', '${datetime}')`,
  whr = null,
  flag = 0;
var branch = await db_Insert(table_name, fields, values, whr, flag);

var table_name = "td_forward",
  fields = `application_status = '${data.application_status}',modified_by = '${data.user_id}', modified_dt = '${datetime}'`,
  values = null;
  whr =`sl_no=${branch_data.suc > 0 ? branch_data.msg[0].sl_no : 0}`,
  flag = 1; 
  var track_dt = await db_Insert(table_name,fields,values,whr,flag);

  if(track_dt.suc > 0){
          if (track_dt.msg.length > 0) {
          res.send({ suc: 1, msg: "Rejected Via Credit Manager", user_dtls: track_dt.msg[0] });
          }else {
           res.send({ suc: 0, msg: "Something Went Wrong"});
          }
      }else {
          res.send({ suc: 2, msg: "No data found"})
      }
});



credit_managerRouter.post("/forward_ceo", async (req, res) =>{
  var data = req.body;
  // console.log(data,'dd');
  datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  var select = "a.sl_no",
  table_name = "td_forward a",
  where = `a.application_no = '${data.application_no}' AND a.forwarded_to = '${data.credit_user_id}' AND a.forwarded_dt = (SELECT MAX(b.forwarded_dt) FROM td_forward b WHERE b.application_no = a.application_no AND b.forwarded_to = a.forwarded_to)`,
  order = null;
  var branch_data = await db_Select(select,table_name,where,order);

  var select = "id,branch_code,user_type",
  table_name = "md_users",
  where = `user_type = '2' AND branch_code = '${data.brn_code}' AND user_approve = '1'`,
  order = null;
  var manager_data = await db_Select(select,table_name,where,order);
  // console.log(manager_data,'user');
  
  var table_name = "td_forward",
  fields = "(application_no, forwarded_dt, forwarded_by, by_brn, forwarded_to, to_brn, application_status, remarks, created_by, created_dt)",
  values =  `('${data.application_no}', '${datetime}', '${data.credit_user_id}', '${data.credit_brn_code}', '${manager_data.msg[0].id}', '${manager_data.msg[0].branch_code}', 'P', '${data.remarks}', '${data.credit_user_id}', '${datetime}')`,
  whr = null,
  flag = 0;
var fwd_credit_dt = await db_Insert(table_name, fields, values, whr, flag);

var table_name = "td_forward",
fields = `application_status = '${data.application_status}',modified_by = '${data.credit_user_id}', modified_dt = '${datetime}'`,
values =  null,
whr = `sl_no=${branch_data.suc > 0 ? branch_data.msg[0].sl_no : 0}`,
flag = 1;
var final_dt_ceo = await db_Insert(table_name, fields, values, whr, flag);
res.send(final_dt_ceo)

//   if(final_dt_1.suc > 0){
//     if (final_dt_1.msg.length > 0) {
//     res.send({ suc: 1, msg: "Branch Manager forwarded to Credit Manager", user_dtls: final_dt_1.msg[0] });
//     }else {
//      res.send({ suc: 0, msg: "Something Went Wrong"});
//     }
// }else {
//     res.send({ suc: 2, msg: "No data found"})
// }
});