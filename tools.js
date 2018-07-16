const fs = require('fs');
var mysql = require('mysql');

module.exports = {
    readYourDbPassword:function(){
      let str = fs.readFileSync("password_db.txt",'utf8');
      return str;
    },
    InsertSingleRowInDb:function(nome, points){
      let str = fs.readFileSync("password_db.txt",'utf8');
      str = str.substring(0, str.length - 1);
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: str,
        database: "wso"
      });

      con.connect(function(err) {
        if (err) throw err;
        // console.log("Connected! insertsinglerowindb");

        var sql = "INSERT INTO rank (id, nome, points) VALUES (null, '"+ nome + "', " + points + ");";
        console.log("sql: " + sql);
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("inserted: " + sql);
        });
      });
    },
    ReadRankFromDb:function(){
      let str = fs.readFileSync("password_db.txt",'utf8');
      str = str.substring(0, str.length - 1);
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: str,
        database: "wso"
      });

      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "INSERT INTO rank (id, nome, points) VALUES (null, 'jaca', 37)";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
    }

}
