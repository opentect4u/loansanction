// VARIABLE & MODULE INITIALIZATION
const db_details = require("../db/conString"),
    oracledb = require("oracledb");
require('dotenv').config()
try {
    oracledb.initOracleClient({ libDir: process.env.INSTACLIENT_PATH });
} catch (err) {
    console.error("Whoops!");
    console.error(err);
    process.exit(1);
}
oracledb.autoCommit = true;
// END

// FUNCTION FOR EXICUTE SELECT QUERY AND RETURN RESULT
const F_Select = (pax_id, fields, table_name, where, order, flag) => {
    return new Promise(async (resolve, reject) => {
        where = where ? `WHERE ${where}` : '';
        order = order ? order : '';

        try{
            // CREATE DB CONNECTION
            const pool = await oracledb.createPool(db_details[pax_id]);
            const con = await pool.getConnection();
            // END
            try {
                // SQL QUERY
                let sql = `SELECT ${fields} ${table_name != null ? 'FROM ' + table_name : ''} ${where} ${order}`
                // console.log(sql);
    
                // EXICUTE QUERY
                const result = await con.execute(sql, [], {
                    resultSet: true,
                    outFormat: oracledb.OUT_FORMAT_OBJECT
                });
                // END
    
                // STORE RESULT SET IN A VARIABLE
                let rs = result.resultSet
                // console.log(rs);
    
                // RETURN RESULT SET AS USER'S REQUIREMENT
                var data = flag > 0 ? await rs.getRows() : await rs.getRow(); // 0-> Single DataSet; 1-> Multiple DataSet
                // console.log(await rs.getRows());
                // END
    
                // CLOSE CONNECTION
                // await con.release();
                await con.close();
                await pool.close();
                // END
                data = flag > 0 ? (data.length > 0 ? { suc: 1, msg: data } : { suc: 0, msg: 'No Data Found' }) : (data ? { suc: 1, msg: data } : { suc: 0, msg: 'No Data Found' })
                resolve(data);
            } catch (err) {
                await con.close();
                await pool.close();
                resolve({ suc: 0, msg: err });
            }
        }catch(err){
            console.log(err);
            resolve({ suc: 0, msg: err });
        }
    })
}

const RunProcedure = (pax_id, pro_query, table_name, fields, where, order) => {
    return new Promise(async (resolve, reject) => {
        where = where ? `WHERE ${where}` : '';
        order = order ? order : '';

        const pool = await oracledb.createPool(db_details[pax_id]);
        const con = await pool.getConnection();
        //pro_query = "";
        let query = pro_query;//`DECLARE AD_ACC_TYPE_CD NUMBER; AS_ACC_NUM VARCHAR2(200); ADT_FROM_DT DATE; ADT_TO_DT DATE; BEGIN AD_ACC_TYPE_CD := 6; AS_ACC_NUM := '1044100002338'; ADT_FROM_DT := to_date(to_char('20-Oct-2021')); ADT_TO_DT := to_date(to_char('20-Oct-2022')); P_ACC_STMT( AD_ACC_TYPE_CD => AD_ACC_TYPE_CD, AS_ACC_NUM => AS_ACC_NUM, ADT_FROM_DT => ADT_FROM_DT, ADT_TO_DT => ADT_TO_DT ); END;`;
        try{

            await con.execute(query);
            const r = await con.execute(`SELECT ${fields} FROM ${table_name} ${where} ${order}`, [], {
                resultSet: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            });
    
            let rs = r.resultSet
            //   console.log({rs});
            var data = await rs.getRows();
            //   console.log({data});
            await con.close();
            await pool.close();
            resolve(data);
        }catch(err){
            await con.close();
            await pool.close();
            resolve({suc: 0, msg: err});
        }
    })
}

const F_Insert = (pax_id, table_name, fields, fieldIndex, values, where, flag) => {
    return new Promise(async (resolve, reject) => {
        try{
            // CREATE DB CONNECTION
            const pool = await oracledb.createPool(db_details[pax_id]);
            const con = await pool.getConnection();
            // END
    
            // SQL QUERY
            const sql = flag > 0 ? `UPDATE ${table_name} SET ${fields} WHERE ${where}` :
                `INSERT INTO ${table_name} (${fields}) VALUES ${fieldIndex}`; // 0-> INSERT NEW DATA; 1-> UPDATE TABLE DATA
            console.log(sql, values);
    
            try {
                // EXICUTE QUERY AND RETURN RESULT
                if (await con.execute(sql, values, { autoCommit: true })) {
                    res_data = { suc: 1, msg: 'success' };
                } else {
                    res_data = { suc: 0, msg: 'err' };
                }
                await con.close();
                await pool.close();
                // const res = await con.execute(`SELECT * FROM "${table_name}"`);
                resolve(res_data)
            } catch (err) {
                console.log(err);
                await con.close();
                await pool.close();
                resolve({ suc: 0, msg: err })
            }
            //END
        }catch(err){
            console.log(err);
            resolve({ suc: 0, msg: err })
        }
    })
}

const F_Delete = (pax_id, table_name, where) => {
    return new Promise(async (resolve, reject) => {
        // CREATE DB CONNECTION
        const pool = await oracledb.createPool(db_details[pax_id]);
        const con = await pool.getConnection();
        // END

        // SQL QUERY
        const sql = `DELETE FROM ${table_name} WHERE ${where}`;
        console.log(sql);

        try{
            const result = await con.execute(sql, [], {
                resultSet: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            });
            // END
            console.log(result);
            // STORE RESULT SET IN A VARIABLE
            let rs = result.rowsAffected
            // console.log(rs);
    
            // CLOSE CONNECTION
            // await con.release();
            await con.close();
            await pool.close();
            // END
            data = rs > 0 ? { suc: 1, msg: 'Deleted Successfully' } : { suc: 0, msg: 'Error in deletion' }
            resolve(data);
            //END
        }catch(err){
            await con.close();
            await pool.close();
            resolve({suc: 0, msg: err});
        }
    })
}

module.exports = { F_Select, F_Insert, RunProcedure, F_Delete }
