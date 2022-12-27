const mysqli = require('mysql');

var connection = mysqli.createConnection({
    host     : 'artuts4u-db.c8khoazeberu.ap-south-1.rds.amazonaws.com',
    port     :  3306,
    user     : 'admin',
    password : 'Admin$123',
    database : 'cointab_db'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ❌ ' + err.message);
      return;
    }
   
    console.log('connected as id 🚀 ' + connection.threadId);
  });




const mysql = function  (sqlQuery, params) {
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery,params, (err, result) => {
          if(err){reject(new Error());}
             else{resolve(result);}
          });
       });
};
   

module.exports = mysql