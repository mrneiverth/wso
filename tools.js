const fs = require('fs');

module.exports = {
    readTextFile:function(){
      let str = fs.readFileSync("ranking.txt",'utf8');
      console.log("the file was read!");
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
    UpdateRankingFile:function(str){

    }

}
