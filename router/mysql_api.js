const { db_Insert, db_Select, db_Delete } = require("../model/mysqlModel");

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

sqlRouter.post("/insert_update", async (req, res) => {
    var data = req.body;
    var table_name = "md_topic_catg",
      fields = data.id > 0 ? `catg_name = "${data.catg_name}"` : "(repo_flag, catg_name)",
      values = `('${data.flag}', "${data.catg_name}")`,
      whr = data.id > 0 ? `id = ${data.id}` : null,
      flag = data.id > 0 ? 1 : 0;
    var res_dt = await db_Insert(table_name, fields, values, whr, flag);
    res.send(res_dt)
});

sqlRouter.get("/delete", async (req, res) => {
    var id = req.query.id,
      res_dt;
    res_dt = await db_Delete('md_topic_catg', `id = ${id}`);
    res.send(res_dt)
  });

module.exports = {sqlRouter}