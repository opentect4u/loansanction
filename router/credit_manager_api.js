const express = require('express'),
credit_managerRouter = express.Router(),
dateFormat = require('dateformat');
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');
const { db_Select } = require('../model/mysqlModel');

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