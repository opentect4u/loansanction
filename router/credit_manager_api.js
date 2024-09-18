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