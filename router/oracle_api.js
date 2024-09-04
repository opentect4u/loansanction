const express = require('express'),
  appApiRouter = express.Router(),
  dateFormat = require('dateformat');

var db_id = 1;

const { F_Select, F_Insert, RunProcedure } = require('../model/orclModel');

// appApiRouter.post('/select', async (req, res) => {
//   var data = req.body;
//   var phone_no = data.phone_no.split(' ').join('');
//   var pax_id = db_id,
//     fields = "COUNT(*) HAS_ACC",
//     table_name = "MD_USER",
//     where = `USER_CD = '${phone_no.length > 10 ? phone_no.slice(-10) : phone_no}'`,
//     order = null,
//     flag = 0;
//   var resDt = await F_Select(pax_id, fields, table_name, where, order, flag)
//   res.send(resDt);
// })

appApiRouter.post('/select_cust_dtls', async (req, res) => {
  var data = req.body;
  var cust_id = data.cust_id
  var pax_id = db_id,
    fields = `*`,
    table_name = `mm_customer`,
    where = `CUST_CD = ${cust_id}`,
    order = null,
    flag = 0;
  var resDt = await F_Select(pax_id, fields, table_name, where, order, flag)
  // console.log(resDt);
  res.send(resDt);
})

appApiRouter.post('/run_procedure', async (req, res) => {
  var data = req.body;
  var acc_num = data.acc_num,
    acc_type = data.acc_type,
    frmdt = dateFormat(data.frm_dt, "dd/mm/yyyy"),
    todt = dateFormat(data.to_dt, "dd/mm/yyyy");
  var pax_id = db_id,
    pro_query = `DECLARE AD_ACC_TYPE_CD NUMBER; AS_ACC_NUM VARCHAR2(200); ADT_FROM_DT DATE; ADT_TO_DT DATE; BEGIN AD_ACC_TYPE_CD := ${acc_type};AS_ACC_NUM := '${acc_num}';ADT_FROM_DT := TO_DATE('${frmdt}', 'dd/mm/yyyy');ADT_TO_DT := TO_DATE('${todt}', 'dd/mm/yyyy');P_ACC_STMT(AD_ACC_TYPE_CD => AD_ACC_TYPE_CD,AS_ACC_NUM => AS_ACC_NUM,ADT_FROM_DT => ADT_FROM_DT,ADT_TO_DT => ADT_TO_DT); END;`,
    table_name = 'tt_acc_stmt',
    fields = '*',
    where = null,
    order = null;
  // console.log(pro_query);
  var resDt = await RunProcedure(pax_id, pro_query, table_name, fields, where, order)
  res.send(resDt);
})

appApiRouter.post('/insert_update', async (req, res) => {
  var data = req.body;
  var sql_data = {}
    if(id > 0){
        sql_data = {
            home_name: { val: data.home_name, type: oracledb.STRING },
            location: { val: data.location, type: oracledb.STRING },
            price: { val: data.price, type: oracledb.STRING },
            rating: { val: parseFloat(data.rating), type: oracledb.NUMBER },
            descr: { val: data.desc, type: oracledb.STRING },
            no_of_bed: { val: parseInt(data.no_of_bed), type: oracledb.NUMBER },
            no_of_bath: { val: parseInt(data.no_of_bath), type: oracledb.NUMBER },
            no_of_floor: { val: parseInt(data.no_of_floor), type: oracledb.NUMBER },
            room_size: { val: parseInt(data.room_size), type: oracledb.NUMBER },
            modifiedBy: { val: user, type: oracledb.STRING },
            modifiedDt: { val: new Date(datetime), type: oracledb.DATE },
            slNo: {val: parseInt(data.sl_no), type: oracledb.NUMBER}
        }
    }else{
        sql_data = {
            home_name: { val: data.home_name, type: oracledb.STRING },
            location: { val: data.location, type: oracledb.STRING },
            price: { val: data.price, type: oracledb.STRING },
            rating: { val: parseFloat(data.rating), type: oracledb.NUMBER },
            descr: { val: data.desc, type: oracledb.STRING },
            no_of_bed: { val: parseInt(data.no_of_bed), type: oracledb.NUMBER },
            no_of_bath: { val: parseInt(data.no_of_bath), type: oracledb.NUMBER },
            no_of_floor: { val: parseInt(data.no_of_floor), type: oracledb.NUMBER },
            room_size: { val: parseInt(data.room_size), type: oracledb.NUMBER },
            modifiedBy: { val: user, type: oracledb.STRING },
            modifiedDt: { val: new Date(datetime), type: oracledb.DATE },
            bank_id: {val: parseInt(db_id), type: oracledb.NUMBER},
            slNo: {val: parseInt(data.sl_no), type: oracledb.NUMBER}
        }
    }
    var pax_id = db_id,
    table_name = "TD_HOLIDAY_HOME",
    fields =
      id > 0
        ? "HOME_NAME = :home_name, LOCATION = :location, PRICE = :price, RATING = :rating, DESCRIPTION = :descr, NO_OF_BED = :no_of_bed, NO_OF_BATH = :no_of_bath, NO_OF_FLOORS = :no_of_floor, ROOM_SIZE = :room_size, MODIFIED_BY = :modifiedBy, MODIFIED_DT = :modifiedDt"
        : "SL_NO, HOME_NAME, LOCATION, PRICE, RATING, DESCRIPTION, NO_OF_BED, NO_OF_BATH, NO_OF_FLOORS, ROOM_SIZE, CREATED_BY, CREATED_DT, BANK_ID",
    fieldIndex = `((SELECT CASE WHEN MAX(SL_NO) > 0 THEN MAX(SL_NO) ELSE 0 END + 1 FROM TD_HOLIDAY_HOME), :home_name, :location, :price, :rating, :descr, :no_of_bed, :no_of_bath, :no_of_floor, :room_size, :modifiedBy, :modifiedDt, :bank_id)`,
      values = sql_data,
    where = id > 0 ? `SL_NO = :slNo` : null,
    flag = id > 0 ? 1 : 0;
  var resDt = await F_Insert(pax_id, table_name, fields, fieldIndex, values, where, flag)
  res.send(resDt);
})

module.exports = { appApiRouter };