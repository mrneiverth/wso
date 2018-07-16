const fs = require('fs');
var mysql = require('mysql');

module.exports = {
    readYourDbPassword:function(){
      let str = fs.readFileSync("password_db.txt",'utf8');
      return str;
    },
    WriteTextFile:function(str){
      // var fs = require('fs');
      fs.writeFile("ranking.txt", str, function(err) {
      if(err) {
        return console.log(err);
      }

      console.log("the file was saved!");

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
