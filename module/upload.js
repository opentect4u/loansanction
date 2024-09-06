var dateFormat = require("dateformat"),
  path = require("path"),
  fs = require("fs");
const { db_Insert } = require("../model/mysqlModel");

// *****************************************************************************************************
const dynamicFileUpload = (filePath, fileName, file) => {
    return new Promise((resolve, reject) => {
      var res_dt,
        nowTime = new Date().getTime();
      if (file) {
        file.mv(filePath, async (err) => {
          if (err) {
            console.log(`${fileName} not uploaded`);
            res_dt = { suc: 0, msg: err };
          } else {
            res_dt = { suc: 1, msg: `${fileName} uploaded successfully.` };
          }
          resolve(res_dt);
        });
      } else {
        resolve({ suc: 0, msg: "No file found" });
      }
    });
  }; 

  module.exports = {
    saveFile: (file, app_id, memb_id) => {
        // console.log(file,'f');
        
        return new Promise(async (resolve, reject) => {
          var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
            res_dt;

          if (file) {
            var dir = "assets";
            var subDir = `uploads`;
            if (!fs.existsSync(path.join(dir, subDir))) {
              fs.mkdirSync(path.join(dir, subDir));
            }
    
              var nowTime = new Date().getTime();
              var File_name =nowTime + "_" + file.name;
              var file_upload = await dynamicFileUpload(
                path.join("assets", "uploads", File_name),File_name,file
              );

              if (file_upload.suc > 0) {
                res_dt = await db_Insert(
                  "td_upload_file",
                  "(application_no,member_id,file_path,created_by,created_dt)",
                  // `file = 'uploads/${File_name}'`,
                  `(${app_id},${memb_id},'uploads/${File_name}','user','${datetime}')`,
                  null,
                  0
                );
               res_dt['file'] = `uploads/${File_name}`
              } else {
                res_dt = file_upload;
                res_dt['file'] = ''
              }
            
            resolve(res_dt);
          } else {
            resolve({ suc: 0, msg: "No file found" });
          }
        });
      },
  }
  // ******************************************************************************************************

  // const dynamicFileUpload = (filePath, fileName, file) => {
  //   return new Promise((resolve, reject) => {
  //     var res_dt,
  //       nowTime = new Date().getTime();
  //     if (file) {
  //       file.mv(filePath, async (err) => {
  //         if (err) {
  //           console.log(`${fileName} not uploaded`);
  //           res_dt = { suc: 0, msg: err };
  //         } else {
  //           res_dt = { suc: 1, msg: `${fileName} uploaded successfully.` };
  //         }
  //         resolve(res_dt);
  //       });
  //     } else {
  //       resolve({ suc: 0, msg: "No file found" });
  //     }
  //   });
  // }; 

  // module.exports = {
  //   saveFile: (file, data) => {
  //       console.log(file,'f');
        
  //       return new Promise(async (resolve, reject) => {
  //         var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
  //           res_dt;

  //         if (file) {
  //           var dir = "assets";
  //           var subDir = `uploads`;
  //           if (!fs.existsSync(path.join(dir, subDir))) {
  //             fs.mkdirSync(path.join(dir, subDir));
  //           }
    
  //             var nowTime = new Date().getTime();
  //             var File_name =nowTime + "_" + file.name;
  //             var file_upload = await dynamicFileUpload(
  //               path.join("assets", "uploads", File_name),File_name,file
  //             );

  //             if (file_upload.suc > 0) {
  //               res_dt = await db_Insert(
  //                 "td_loan_application",
  //                 `file = 'uploads/${File_name}'`,
  //                 null,
  //                 `application_no = '${data.application_no}'`,
  //                 1
  //               );
  //              res_dt['file'] = `uploads/${File_name}`
  //             } else {
  //               res_dt = file_upload;
  //               res_dt['file'] = ''
  //             }
            
  //           resolve(res_dt);
  //         } else {
  //           resolve({ suc: 0, msg: "No file found" });
  //         }
  //       });
  //     },
  // }