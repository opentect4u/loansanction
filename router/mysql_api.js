const { query } = require("express");
const { db_Insert, db_Select, db_Delete } = require("../model/mysqlModel");
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');
const { saveFile } = require("../module/upload");
const multer = require('multer');

const upload = multer().array('files');

// function generateAppId(lastAppId) {
//   const year = new Date().getFullYear(); // Get the current year
//   if (!lastAppId) {
//     return `${year}000001`; // If there's no lastAppId, return the first ID for the current year
//   }

//   const lastYear = lastAppId.slice(0, 4); // Extract the year part from lastAppId
//   const lastNumber = parseInt(lastAppId.slice(4), 10); // Extract and convert the numeric part

//   if (parseInt(lastYear, 10) === year) {
//     const newNumber = String(lastNumber + 1).padStart(6, '0'); // Increment and pad with leading zeros
//     return `${year}${newNumber}`;
//   } else {
//     return `${year}000001`; // If the year changed, reset the counter
//   }
// }
// ******************************************************************************************************************

const sqlRouter = require("express").Router(),
  dateFormat = require("dateformat");

// sqlRouter.get("/select", async (req, res) => {
//     var data = req.query;

//     var select = 'id, catg_name',
//         table_name = 'md_topic_catg',
//         whr = ` repo_flag = '${data.flag}' ${data.id > 0 ? `AND id = ${data.id}` : ''}`, 
//         order = null;
//         var res_dt = await db_Select(select, table_name, whr, order)
//     res.send(res_dt)
// });
// ***************************************************************************************************

sqlRouter.get("/branch_dtls", async (req, res) => {
  var data = req.query;

  var select = 'sl_no , branch_name',
    table_name = 'md_branch',
    whr = null,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order)
  res.send(res_dt)
});
// ************************************************************************************************

sqlRouter.get("/loan_type_dtls", async (req, res) => {
  var data = req.query;

  var select = 'sl_no , loan_type',
    table_name = 'md_loan_type',
    whr = null,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order)
  res.send(res_dt)
});
// ***************************************************************************************************

// sqlRouter.post("/insert_update", async (req, res) => {
//     var data = req.body;
//     var table_name = "md_topic_catg",
//       fields = data.id > 0 ? `catg_name = "${data.catg_name}"` : "(repo_flag, catg_name)",
//       values = `('${data.flag}', "${data.catg_name}")`,
//       whr = data.id > 0 ? `id = ${data.id}` : null,
//       flag = data.id > 0 ? 1 : 0;
//     var res_dt = await db_Insert(table_name, fields, values, whr, flag);
//     res.send(res_dt)
// });
// ********************************************************************************************************

const Max_appNo = () => {
  return new Promise(async (resolve, reject) => {
    var select = "ifnull(max(application_no), '0')",
    table_name = "td_loan_application",
    where = null;
    order = null;
    var res_dt = await db_Select(select,table_name,where,order);
    resolve(res_dt);
  });
}

// *******************************************************************************************************************
// sqlRouter.post("/insert_loan_dtls", async (req, res) => {
//   var data = req.body,
//   files = req.files ? req.files.file_path : null;
//   console.log(files,'sssssssss');
  
//   // docs = req.docs ? req.docs.file_name : null;
//   // console.log(data,'data');
//   var max_app = Max_appNo()
//   console.log(max_app, "kkkkkkkkkk");
//   var current_datetime = new Date(),
//   receipt = Math.floor(current_datetime.getTime() / 1000),
//   datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
//   date = dateFormat(new Date(), "yyyy-mm-dd");
//   year = new Date().getFullYear();
//   year1 = year.toString();
//   new_id = year1.padEnd(10,"0");
//   console.log(new_id);

//   var select1 = "ifnull(MAX(application_no),'2024000000') app_no",
//   table_name1 = "td_loan_application",
//   whr1 = null,
//   order1 = null;
//   var res_dt1 = await db_Select(select1, table_name1, whr1, order1);
//   var lastrow = res_dt1.msg[0].app_no
//   var newId = parseInt(lastrow) + 1

//   console.log(newId);
  
//   if(res_dt1.suc > 0){
//   var table_name = "td_loan_application",

//     fields = "(application_dt, application_no, member_id, member_name, father_name, gender, dob, member_dt, email, mobile_no, memb_address, branch_code, loan_type, loan_amt, loan_period, created_by, created_at)",
//     values = `('${date}', '${newId}', ${data.member_id}, '${data.member_name}', '${data.father_name}', '${data.gender}', '${data.dob}', '${data.member_dt}', '${data.email}', '${data.mobile_no}', '${data.memb_address}', '${data.branch_code}', '${data.loan_type}', '${data.loan_amt}', '${data.loan_period}', '${data.created_by}', '${datetime}')`,
//     whr = null,
//     flag = 0;
//   var res_dt = await db_Insert(table_name, fields, values, whr, flag);
//   var fileData = JSON.parse(data.file_name)
//   if(res_dt.suc > 0 && files){
//     if(Array.isArray(files)){
//       var i = 0
//       for(let fdt of files){
//         var file_dt = await saveFile(fdt, newId, data.member_id, fileData[i].l_file_name)
//         console.log(file_dt);
//         i++
//       }
//     }else{
//       var file_dt = await saveFile(files, newId, data.member_id, fileData[0].l_file_name)
//     }
//   }
//   const app_id = "app_id"
//   res_dt[app_id] = newId
//   }

//   res.send(res_dt) 
// });
// *******************************************************************************************************************

sqlRouter.post("/insert_loan_dtls", async (req, res) => {
  var data = req.body;
  console.log(data,'dt');
  
  files = req.files ? req.files.file_path : null;
  // console.log(files,'sssssssss');
  
  // docs = req.docs ? req.docs.file_name : null;
  // console.log(data,'data');
  var max_app = Max_appNo()
  // console.log(max_app, "kkkkkkkkkk");
  var current_datetime = new Date(),
  receipt = Math.floor(current_datetime.getTime() / 1000),
  datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
  date = dateFormat(new Date(), "yyyy-mm-dd");
  year = new Date().getFullYear();
  year1 = year.toString();
  new_id = year1.padEnd(10,"0");
  // console.log(new_id);

  var select1 = "IF(MAX(SUBSTRING(application_no, -6)) > 0, LPAD(MAX(cast(SUBSTRING(application_no, -6) as unsigned))+1, 6, '0'), '000001') max_form",
  table_name1 = "td_loan_application",
  whr1 = `SUBSTRING(application_no, 1, 4) = YEAR(now())`,
  order1 = null;
  var res_dt1 = await db_Select(select1, table_name1, whr1, order1);
  // var lastrow = res_dt1.msg[0].app_no
  // var newId = parseInt(lastrow) + 1
  var newId = `${year}${res_dt1.msg[0].max_form}`

  // console.log(newId);

  
  if(res_dt1.suc > 0){
    var table_name = "td_loan_application",

      fields = data.application_no > 0 ? `member_id='${data.member_id}', member_name='${data.member_name}', father_name='${data.father_name}', gender='${data.gender}', dob='${data.dob}', member_dt='${data.member_dt}', email='${data.email}', mobile_no='${data.mobile_no}', memb_address='${data.memb_address}', branch_code='${data.branch_code}', loan_type='${data.loan_type}', loan_amt='${data.loan_amt}', loan_period='${data.loan_period}', modified_by='${data.created_by}', modified_at='${datetime}'` : "(application_dt, application_no, member_id, member_name, father_name, gender, dob, member_dt, email, mobile_no, memb_address, branch_code, loan_type, loan_amt, loan_period, created_by, created_at)",
      values =  `('${datetime}', '${newId}', ${data.member_id}, '${data.member_name}', '${data.father_name}', '${data.gender}', '${data.dob}', '${data.member_dt}', '${data.email}', '${data.mobile_no}', '${data.memb_address}', '${data.branch_code}', '${data.loan_type}', '${data.loan_amt}', '${data.loan_period}', '${data.created_by}', '${datetime}')`,
      whr = data.application_no > 0 ? `application_no=${data.application_no}` : null,
      flag = data.application_no > 0 ? 1 : 0;
    var res_dt = await db_Insert(table_name, fields, values, whr, flag);
    // console.log(res_dt,'res');
  
  
    if(files !== null){
      var fileData = JSON.parse(data.file_name)
      if(res_dt.suc > 0 && files){
        if(Array.isArray(files)){
          var i = 0
          for(let fdt of files){
            var file_dt = await data.application_no > 0 ? saveFile(fdt, data.application_no, data.member_id, fileData[i].l_file_name, data.user_id) : saveFile(fdt, newId, data.member_id, fileData[i].l_file_name, data.user_id)
            // console.log(file_dt);
            i++
          }
        }else{
          var file_dt = await data.application_no>0 ?  saveFile(files, data.application_no, data.member_id, fileData[0].l_file_name, data.user_id) :  saveFile(files, newId, data.member_id, fileData[0].l_file_name, data.user_id)
        }
      }
    }
    // else{
    //   var fileData = null
    //   if(res_dt.suc > 0 && files){
    //     if(Array.isArray(files)){
    //       var i = 0
    //       for(let fdt of files){
    //         var file_dt = await data.application_no > 0 ? saveFile(fdt, data.application_no, data.member_id, fileData) : saveFile(fdt, newId, data.member_id, fileData)
    //         console.log(file_dt);
    //         i++
    //       }
    //     }else{
    //       var file_dt = await data.application_no>0 ?  saveFile(files, data.application_no, data.member_id, fileData) :  saveFile(files, newId, data.member_id, fileData)
    //     }
    //   }
    // }
    // }

    // if(res_dt.suc > 0){

    if(data.application_no > 0){

    }else{
      var select = "id,branch_code",
      table_name = "md_users",
      where = `user_type = '5' AND branch_code = '${data.branch_code}' AND user_approve = '1'`,
      order = null;
      var user_data = await db_Select(select,table_name,where,order);
      console.log(user_data,'user');
      
  
      var table_name = "td_forward",
        fields = "(application_no, forwarded_dt, forwarded_by, by_brn, forwarded_to, to_brn, application_status, created_by, created_dt)",
        values =  `('${newId}', '${datetime}', '8', '${data.branch_code}', '${user_data.msg[0].id}', '${user_data.msg[0].branch_code}', 'P', '${data.member_name}', '${datetime}')`,
        whr = null,
        flag = 0;
      var fwd_dt = await db_Insert(table_name, fields, values, whr, flag);
      // console.log(fwd_dt);
    
      // if (fwd_dt.suc > 0){
      //   var table_name = "td_appl_track",
      //   fields = "(application_no, user_id, application_status, created_by, created_dt)",
      //   values =  `('${newId}', '${user_data.msg[0].id}', 'P', '${data.created_by}', '${datetime}')`,
      //   whr = null,
      //   flag = 0;
      // var app_dt = await db_Insert(table_name, fields, values, whr, flag);
      // }
    }
  }


  const app_id = "app_id"
  data.application_no > 0 ? null : res_dt[app_id] = newId
  res.send(res_dt) 
});
// ##############################################################################################

sqlRouter.post("/user_login", async (req, res) => {
  var data = req.body;
  // console.log(data,'dt');

  var select = '*',
    table_name = 'md_users',
    whr = `email = '${data.email}'`,
    order = null;
    var res_dt = await db_Select(select, table_name, whr, order);
    // console.log(res_dt.msg[0]["id"],"mmmmmmm")
    if (res_dt.suc > 0) {
      if (res_dt.msg.length > 0) {
        if (await bcrypt.compare(data.password, res_dt.msg[0].password)) {
          // req.session.user = res_dt.msg[0];
          res.send({ suc: 1, msg: "login successful", user_dtls: res_dt.msg[0] });
        } else {
          result = {
            suc: 0,
            msg: "Please check your userid or password",
            // dt: res_dt
          };
          res.send(result)
        }
        } else {
          result = { suc: 0, msg: "No data found", dt: res_dt };
          res.send(result)
        }
      }  else {
        result = { suc: 0, msg: res_dt.msg, dt: res_dt };
        res.send(result)
      }
  });
// *******************************************************************************************************

  sqlRouter.get("/select_br_manager", async (req, res) => {
    var data = req.query;
  
    var select = 'a.id, a.first_name, a.last_name, b.branch_code, c.branch_name',
      table_name = 'md_users a, td_loan_application b, md_branch c',
      whr = `b.branch_code=c.sl_no and c.sl_no=a.branch_code and b.application_no=${data.application_no}`,
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
});


// ***************************************************************************************************
// sqlRouter.get("/fetch_loan_dtls", async (req, res) => {
//     var data = req.query;
//     console.log(data,'de');
  
//     var select = '@d:=@d+1 sl_no, a.application_dt,a.application_no,a.member_id,a.member_name,a.father_name,a.gender,a.dob,a.member_dt,a.email,a.mobile_no,a.memb_address,a.branch_code,b.branch_name,a.loan_type,a.application_status,c.loan_type loan_type_name,a.loan_amt,a.loan_period,a.created_by,a.created_at,a.modified_by,a.modified_at',
//       table_name = '(SELECT @d:= 0) AS d,td_loan_application a, md_branch b, md_loan_type c',
//       whr = data.application_no > 0 ? `b.sl_no=a.branch_code and c.sl_no=a.loan_type and a.application_no = '${data.application_no}'` : `b.sl_no=a.branch_code and c.sl_no=a.loan_type`,
//       order = `ORDER BY a.created_by`;
//     var res_dt = await db_Select(select, table_name, whr, order)
//     console.log(res_dt,'res');
    
//     res.send(res_dt)
// });


sqlRouter.get("/fetch_loan_dtls", async (req, res) => {
  var data = req.query;
  // console.log(data,'de');

  // var select = '@d:=@d+1 sl_no, a.application_dt,a.application_no,a.member_id,a.member_name,a.father_name,a.gender,a.dob,a.member_dt,a.email,a.mobile_no,a.memb_address,a.branch_code,a.loan_type,a.loan_amt,a.loan_period,a.created_by,a.created_at,a.modified_by,a.modified_at,b.forwarded_dt,b.forwarded_by,b.by_brn,b.forwarded_to,b.to_brn,c.*,e.branch_name,f.loan_type loan_type_name',
  //   table_name = '(SELECT @d:= 0) AS d,td_loan_application a, td_forward b, td_appl_track c, md_branch e, md_loan_type f',
  //   whr = `a.application_no = b.application_no 
  //   AND a.application_no = c.application_no
  //   AND a.branch_code = e.sl_no
  //   AND a.loan_type = f.sl_no
  //   AND c.application_status = 'P'
  //   AND c.user_id = '${data.user_id}' ${data.application_no > 0 ? `AND a.application_no = '${data.application_no}'` : ''}`,
  //   order = `GROUP BY a.application_no ORDER BY a.created_by`;
  // var res_dt = await db_Select(select, table_name, whr, order)

  // var select = '@f:=@f+1 sl_no, a.application_dt,a.application_no,a.member_id,a.member_name,a.father_name,a.gender,a.dob,a.member_dt,a.email,a.mobile_no,a.memb_address,a.branch_code,a.loan_type,a.loan_amt,a.loan_period,a.created_by,a.created_at,a.modified_by,a.modified_at,b.forwarded_dt,b.forwarded_by,b.by_brn,b.forwarded_to,b.to_brn,c.*,d.branch_name,e.loan_type loan_type_name',
  //   table_name = '(SELECT @f:= 0) AS f, td_loan_application a, td_forward b, td_appl_track c, md_branch d, md_loan_type e',
  //   whr = `a.application_no = b.application_no 
  //   AND a.application_no = c.application_no
  //   AND b.forwarded_to = c.user_id
  //   AND a.branch_code = d.sl_no
  //   AND a.loan_type = e.sl_no
  //   AND b.forwarded_dt = (SELECT MAX(g.forwarded_dt) FROM td_forward g WHERE a.application_no=g.application_no AND g.forwarded_to = c.user_id)
  //   AND c.application_status = 'P'
  //   AND c.user_id = '${data.user_id}' ${data.application_no > 0 ? `AND a.application_no = '${data.application_no}'` : ''}`,
  //   order = `GROUP BY a.application_no ORDER BY a.created_by`;
  // var res_dt = await db_Select(select, table_name, whr, order)
  // console.log(res_dt,'res');

//   var select =  'a.*,b.*,c.*,d.branch_name,e.loan_type loan_type_name,e.sl_no loan_type',
// table_name = 'td_loan_application a, td_forward b, td_appl_track c, md_branch d, md_loan_type e',
// whr = `a.application_no = b.application_no 
//      AND a.application_no = c.application_no
//     AND a.branch_code = d.sl_no
//     AND a.loan_type = e.sl_no
//     AND b.forwarded_dt = (SELECT MAX(g.forwarded_dt) FROM td_forward g WHERE a.application_no=g.application_no AND g.forwarded_to = c.user_id)
//     AND c.application_status = 'P'
//     AND c.user_id = '${data.user_id}' ${data.application_no > 0 ? `AND a.application_no = '${data.application_no}'` : ''}`
//     order = `ORDER BY a.created_by`;
//     var res_dt = await db_Select(select, table_name, whr, order)

var select = 'a.*,b.*,d.branch_name,e.loan_type loan_type_name,e.sl_no loan_type',
table_name = 'td_loan_application a, td_forward b, md_branch d, md_loan_type e',
whr =  `a.application_no = b.application_no 
    AND a.branch_code = d.sl_no
    AND a.loan_type = e.sl_no
     AND b.application_status = 'P'
    AND  b.forwarded_to = '${data.user_id}' ${data.application_no > 0 ? `AND a.application_no = '${data.application_no}'` : ''}`,
order = `ORDER BY a.created_by`;
var res_dt = await db_Select(select, table_name, whr, order)

var select = "@a:=@a+1 sl_no,b.remarks as reject_remarks,forwarded_dt",
table_name = "(SELECT @a:= 0) AS a, td_forward b",
whr = `b.forwarded_by = '${data.user_id}' AND b.application_no = '${data.application_no}'`,
order = null;
var reject_dt = await db_Select(select, table_name, whr, order);

res_dt.msg[0]["reject_dt"] =
reject_dt.suc > 0 ? (reject_dt.msg.length > 0 ? reject_dt.msg : []) : [];
  res.send(res_dt)
});

// ******************************************************************************************************

// sqlRouter.get("/edit_pen_loan", async (req, res) =>{
//   var data  =req.query

//   var select = 'a.*,b.*,c.*,d.branch_name,e.loan_type loan_type_name,e.sl_no loan_type',
//   table_name = 'td_loan_application a, td_forward b, td_appl_track c, md_branch d, md_loan_type e',
//   whr = `a.application_no = b.application_no 
//      AND a.application_no = c.application_no
//     AND a.branch_code = d.sl_no
//     AND a.loan_type = e.sl_no
//     AND c.application_status = 'P'
//     AND c.user_id = '${data.user_id}' AND a.application_no = '${data.application_no}'`,
//     order = null;
//     var res_dt = await db_Select(select, table_name, whr, order)
//     res.send(res_dt)
// })


// ******************************************************************************************************


sqlRouter.get("/fetch_forward_dtls", async (req, res) => {
  var data = req.query;
  // console.log(data,'de');

  // var select = `@d:=@d+1 sl_no, a.application_dt,a.application_no,a.member_id,a.member_name,a.father_name,a.gender,a.dob,a.member_dt,a.email,a.mobile_no,a.memb_address,a.branch_code,a.loan_type,a.loan_amt,a.loan_period,a.created_by,a.created_at,a.modified_by,a.modified_at,b.forwarded_dt,b.forwarded_by,b.by_brn,b.forwarded_to,b.to_brn,b.remarks,c.*,d.branch_name,e.loan_type loan_type_name, (SELECT CONCAT(a.first_name, ' ', a.last_name) FROM md_users a, td_forward b 
  //                WHERE a.id = b.forwarded_to AND a.user_type = '4' AND b.application_no = '${data.application_no}') as forward_user_name,
  //                (SELECT b.remarks FROM md_users a, td_forward b 
  //                WHERE a.id = b.forwarded_to AND a.user_type = '4' AND b.application_no = '${data.application_no}') as forward_remarks`,
  //   table_name = '(SELECT @d:= 0) AS d,td_loan_application a, td_forward b, td_appl_track c, md_branch d, md_loan_type e',
  //   whr = `a.application_no = b.application_no 
  //   AND a.application_no = c.application_no
  //   AND a.branch_code = d.sl_no
  //   AND a.loan_type = e.sl_no
  //    AND b.forwarded_dt = (SELECT MAX(g.forwarded_dt) FROM td_forward g WHERE a.application_no=g.application_no AND g.forwarded_to = c.user_id)
  //   AND c.user_id = '${data.user_id}'
  //   AND b.forwarded_to = '${data.user_id}' ${data.application_no > 0 ? `AND a.application_no = '${data.application_no}'` : ''}`,
  //   // order = `GROUP BY a.application_no HAVING (SELECT COUNT(*) FROM td_upload_file b WHERE a.application_no=b.application_no) > 0`;
  //   order = `HAVING (SELECT COUNT(*) FROM td_upload_file b WHERE a.application_no=b.application_no) > 0`;
  // var res_dt = await db_Select(select, table_name, whr, order)
  // console.log(res_dt,'res');
  
  var select = `a.*,b.*,d.branch_name,e.loan_type loan_type_name,e.sl_no loan_type,(SELECT CONCAT(a.first_name, ' ', a.last_name) FROM md_users a, td_forward b 
   WHERE a.id = b.forwarded_to AND a.user_type = '4' AND b.application_no = '${data.application_no}') as forward_user_name,
 (SELECT b.remarks FROM md_users a, td_forward b 
 WHERE a.id = b.forwarded_to AND a.user_type = '4' AND b.application_no = '${data.application_no}') as forward_remarks`,
table_name = 'td_loan_application a, td_forward b, md_branch d, md_loan_type e',
whr =  `a.application_no = b.application_no 
     AND a.branch_code = d.sl_no
     AND a.loan_type = e.sl_no
    AND b.application_status = 'A'
    AND b.forwarded_to = '${data.user_id}' ${data.application_no > 0 ? `AND a.application_no = '${data.application_no}'` : ''}`,
order = `HAVING (SELECT COUNT(*) FROM td_upload_file b WHERE a.application_no=b.application_no) > 0`;
var res_dt = await db_Select(select, table_name, whr, order)
  res.send(res_dt)
});

// ******************************************************************************************************


sqlRouter.post("/forward_brn_manager", async (req, res) =>{
  var data = req.body;
  console.log(data,'dd');
  datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

  var select = "id,branch_code,user_type",
  table_name = "md_users",
  where = `user_type = '4' AND branch_code = '${data.brn_code}' AND user_approve = '1'`,
  order = null;
  var branch_data = await db_Select(select,table_name,where,order);
  console.log(branch_data,'user');
  
  var table_name = "td_forward",
  fields = "(application_no, forwarded_dt, forwarded_by, by_brn, forwarded_to, to_brn, application_status, remarks, created_by, created_dt)",
  values =  `('${data.application_no}', '${datetime}', '${data.user_id}', '${data.fwd_brn}', '${data.brn_mgr_id}', '${data.brn_code}', 'P', '${data.remarks}', '${data.created_by}', '${datetime}')`,
  whr = null,
  flag = 0;
var fwd_brn_dt = await db_Insert(table_name, fields, values, whr, flag);

var table_name = "td_forward",
fields = `application_status = '${data.application_status}'`,
values =  null,
whr = `application_no=${data.application_no} and forwarded_to = '${data.user_id}'`,
flag = 1;
var final_dt_1 = await db_Insert(table_name, fields, values, whr, flag);

// if(fwd_brn_dt.suc > 0){
//   var table_name = "td_appl_track",
//   fields = `application_status = '${data.application_status}'`,
//   values = null;
//   whr =`application_no=${data.application_no}`,
//   flag = 1; 
//   var table_name = "td_appl_track",
//   fields = `(fwd_dt, application_no,user_id,application_status,created_by,created_dt)`,
//   values = `('${datetime}', '${data.application_no}', '${data.user_id}', '${data.application_status}', '${data.created_by}', '${datetime}')`
//   flag = 0;
//   var final_dt = await db_Insert(table_name,fields,values,whr,flag);

//   var table_name = "td_appl_track",
//   fields = `(application_no,user_id,application_status,created_by,created_dt)`,
//   values = `('${data.application_no}', '${data.brn_mgr_id}', 'P', '${data.created_by}', '${datetime}')`
//   flag = 0;
//   var final_dt_1 = await db_Insert(table_name,fields,values,whr,flag);
//   res.send(final_dt_1)
// }
res.send(final_dt_1)
})

// ******************************************************************************************************

sqlRouter.get('/get_brn_manager', async (req, res) => {
 var data = req.query;

 var select = "*",
 table_name = "md_users",
 whr = `branch_code = '${data.brn_code}' AND user_type = '4'`,
 order = null;
 var brn_dt = await db_Select(select, table_name, whr, order);
 res.send(brn_dt);
})



// ******************************************************************************************************
// sqlRouter.post("/upload_file", async (req, res) => {
//  var data = req.body
//  var file = req.files
// console.log(file,'ss');
// var res_dt = await saveFile(file.file,data)
// console.log(data,'pppp');
// var file_name = "file_name"
// // res_dt['file_name'] = file
// res.send(res_dt)
// });
// ************************************************************************************************************


// sqlRouter.post("/upload_file", upload, async (req, res) => {
//   try{
//     var data = req.body;
//     var files = req.files;
//   console.log(files,'ss');

//   if (!files || files.length === 0) {
//     return res.status(400).send({ suc: 0, msg: 'No files uploaded' });
//   }

//   var res_dt = await saveFile(files.file,data)
//   console.log(data,'pppp');  
//   var file_name = "file_name"
//   // res_dt['file_name'] = file
//   res.send(res_dt);
// } catch (err) {
//   res.status(500).send({ suc: 0, msg: 'Error uploading files', error: err.message });
// }
//   });

// ****************************************************************************************
sqlRouter.post("/upload_file", async (req, res) => {
  var data = req.body
  var file = req.files
//  console.log(file,'ss');
 var res_dt = await saveFile(file.file_path,data.application_no,data.member_id,data.file_name)
//  console.log(res_dt,'pppp');
 var file_name = "file_name"
 
 res.send(res_dt)
 });

module.exports = {sqlRouter}

// **************************************************************************************
// Need to Modify

sqlRouter.post("/insert_fwd_dtls", async (req, res) => {
    var data = req.body;
    datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
    date = dateFormat(new Date(), "yyyy-mm-dd");
    var forwarded_to = data.forwarded_by>0 ? data.forwarded_by - 1 : 0
    var table_name = "td_forward",
      fields = "(application_no, forwarded_dt, forwarded_by, approve_flag, forwarded_to, created_by, created_dt)",
      values = `(${data.application_no}, date('${date}'), '${data.forwarded_by}', 'Y', '${forwarded_to}', '${data.forwarded_by}', '${datetime}')`,
      whr = null,
      flag = 0;
    var res_dt = await db_Insert(table_name, fields, values, whr, flag);
    res.send(res_dt)
});

// *********************************************************************************************************

//comment 16.09.2024
// sqlRouter.post("/approve", async (req, res) => {
//   var data = req.body;
//   datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
//   var approve_status = await db_Select('approve_status','td_loan_application', `application_no=${data.application_no}`,null);
//   var status = approve_status.msg[0]["approve_status"]

//   var select = "a.id",
//   table_name = "md_users a, td_loan_application b",
//   where = status == 'LM' ? `a.branch_code = b.branch_code AND b.application_no = '${data.application_no}' and a.user_type = '4'` : status == 'BM' ? `a.branch_code = b.branch_code AND b.application_no = '${data.application_no}' and a.user_type = '3'` : status == 'CM' ?  `a.branch_code = b.branch_code AND b.application_no = '${data.application_no}' and a.user_type = '2'` :   `a.branch_code = b.branch_code AND b.application_no = '${data.application_no}' and a.user_type = '2'`;
//   order = null;
//   var user_dt = await db_Select(select,table_name,where,order);
//   var fwd_to = user_dt.msg[0].id;
  

//   // console.log(approve_status,"LLL");
//   if (approve_status.suc > 0){
//     var table_name = "td_loan_application",
//         fields = status=='LA'? `approve_status = 'BM'`: status=='BM'? `approve_status = 'CM'` : status=='CM'? `approve_status = 'CEO'` : `approve_status = 'CEO'`,
//         values = null,
//         whr = `application_no=${data.application_no}`,
//         flag = 1
//     var res_dt = await db_Insert(table_name, fields, values, whr, flag);

//     if (res_dt.suc>0){
//       if (user_dt.suc > 0){
//       var table_name = "td_forward",
//       fields = "(application_no, forwarded_dt, forwarded_by, forwarded_to, created_by, created_dt)",
//       values = `(${data.application_no}, '${datetime}', '${data.forwarded_by}', '${fwd_to}', '${data.forwarded_by}', '${datetime}')`,
//       whr = null,
//       flag = 0;
//     var res_dt1 = await db_Insert(table_name, fields, values, whr, flag);
//       }
//     }
//   }
//   res.send(res_dt1);
// });
// ********************************************************************************************************

sqlRouter.post("/update_file", async (req, res) => {
  var data = req.body;
  // console.log(data,'data');
  var res_dt = await db_Delete("td_upload_file", `sl_no = ${data.sl_no} and application_no = '${data.application_no}'`);
  res.send(res_dt);
})


sqlRouter.post("/file_details", async (req, res) => {
  var data = req.body;

  var select = 'sl_no, application_no, file_name, file_path',
      table_name = 'td_upload_file',
      whr = data.application_no > 0 ? `application_no = ${data.application_no}` : "",
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
})