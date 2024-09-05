const { query } = require("express");
const { db_Insert, db_Select, db_Delete } = require("../model/mysqlModel");
const bcrypt = require("bcrypt");

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

sqlRouter.get("/branch_dtls", async (req, res) => {
  var data = req.query;

  var select = 'sl_no , branch_name',
    table_name = 'md_branch',
    whr = null,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order)
  res.send(res_dt)
});

sqlRouter.get("/loan_type_dtls", async (req, res) => {
  var data = req.query;

  var select = 'sl_no , loan_type',
    table_name = 'md_loan_type',
    whr = null,
    order = null;
  var res_dt = await db_Select(select, table_name, whr, order)
  res.send(res_dt)
});

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

sqlRouter.post("/insert_loan_dtls", async (req, res) => {
  var data = req.body;
  // console.log(data,'data');
  var max_app = Max_appNo()
  console.log(max_app, "kkkkkkkkkk");
  var current_datetime = new Date(),
  receipt = Math.floor(current_datetime.getTime() / 1000),
  datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
  date = dateFormat(new Date(), "yyyy-mm-dd");
  year = new Date().getFullYear();
  year1 = year.toString();
  new_id = year1.padEnd(10,"0");
  console.log(new_id);

  var select1 = "ifnull(MAX(application_no),'2024000000') app_no",
  table_name1 = "td_loan_application",
  whr1 = null,
  order1 = null;
  var res_dt1 = await db_Select(select1, table_name1, whr1, order1);
  var lastrow = res_dt1.msg[0].app_no
  var newId = parseInt(lastrow) + 1

  console.log(newId);
  
  if(res_dt1.suc > 0){
  var table_name = "td_loan_application",

    fields = "(application_dt, application_no, member_id, member_name, father_name, gender, dob, member_dt, email, mobile_no, memb_address, branch_code, loan_type, loan_amt, loan_period, created_by, created_at)",
    values = `('${date}', '${newId}', ${data.member_id}, '${data.member_name}', '${data.father_name}', '${data.gender}', '${data.dob}', '${data.member_dt}', '${data.email}', '${data.mobile_no}', '${data.memb_address}', '${data.branch_code}', '${data.loan_type}', '${data.loan_amt}', '${data.loan_period}', '${data.created_by}', '${datetime}')`,
    whr = null,
    flag = 0;
  var res_dt = await db_Insert(table_name, fields, values, whr, flag);
  const app_id = "app_id"
  res_dt[app_id] = newId
  }

  res.send(res_dt) 
});


sqlRouter.get("/delete", async (req, res) => {
  var id = req.query.id,
    res_dt;
  res_dt = await db_Delete('md_topic_catg', `id = ${id}`);
  res.send(res_dt)
});


sqlRouter.post("/user_login", async (req, res) => {
  var data = req.body;
// console.log(data,'dt');

  var select = '*',
    table_name = 'md_users',
    whr = `email = '${data.email}'`,
    order = null;
    var res_dt = await db_Select(select, table_name, whr, order);
    if (res_dt.suc > 0) {
      if (res_dt.msg.length > 0) {
        if (await bcrypt.compare(data.password, res_dt.msg[0].password)) {
          // req.session.user = res_dt.msg[0];
          res.send({ suc: 1, msg: "login successful" });
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

sqlRouter.get("/fetch_loan_dtls", async (req, res) => {
    var data = req.query;
    console.log(data,'dt');
    // let sl_no = ""
    // for (let i = 1; i < data.length; i++) {
    //   sl_no += "sl_no :" + i + "<br>";
    // }

    console.log(sl_no,"uuuuu");
  
    var select = 'a.application_dt,a.application_no,a.member_id,a.member_name,a.father_name,a.gender,a.dob,a.member_dt,a.email,a.mobile_no,a.memb_address,b.branch_name,c.loan_type loan_type_name,a.loan_amt,a.loan_period,a.created_by,a.created_at,a.modified_by,a.modified_at',
      table_name = 'td_loan_application a, md_branch b, md_loan_type c',
      whr = data.application_no > 0 ? `b.sl_no=a.branch_code and c.sl_no=a.loan_type and a.application_no = '${data.application_no}'` : `b.sl_no=a.branch_code and c.sl_no=a.loan_type`,
      order = null;
    var res_dt = await db_Select(select, table_name, whr, order)
    res.send(res_dt)
});


module.exports = { sqlRouter }
