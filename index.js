const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const favicon = require('express-favicon');

const app = express()

const dps = require('dbpedia-sparql-client').default;// npm install dbpedia-sparql-client
const query = 'select distinct * where { ?animal dbo:kingdom dbr:Animal; dbo:phylum ?filo ; dbo:class ?classe; foaf:name ?nome ; rdfs:label ?label; dbo:abstract ?abstract; rdfs:comment ?comment; foaf:isPrimaryTopicOf ?link_wikipedia; dbo:thumbnail ?thumbnail filter(lang(?label) = "pt" && lang(?abstract) = "pt" && lang(?comment) = "pt") filter( ?classe = dbr:Chondrichthyes || ?classe = dbr:Actinopterygii || ?classe = dbr:Osteichthyes || ?classe = dbr:Amphibia || ?classe = dbr:Sauropsida || ?classe = dbr:Reptilia || ?classe = dbr:Aves || ?classe = dbr:Mammalia  ) } order by ?classe';
var tools = require("./tools.js");

app.use(favicon('favicon.png'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
  response.render('home', {
    name: 'Batata'
  })
})

app.get('/busca', (request, response) => {
  var mydata;
  dps.client()
    .query(query)
    .timeout(15000) // optional, defaults to 10000
    .asJson() // or asXml()
    .then(function(r) {
      /* handle success */
      console.log("Sucesso");
      //[db stuffs]
      // let ten_ranked_rows = tools.ReadRankFromDb();
      // console.log("ReadRankFromDb: " + ten_ranked_rows[1].nome + "\n" + ten_ranked_rows[1].pontos);
      // tools.InsertSingleRowInDb("matheus", 500);
      //[/db stuffs]
      var size = r["results"]["bindings"].length;
      var set = new Set();
      for(i = 0; i < 3; i++){
        var num = Math.floor((Math.random() * size));
        set.add(num);
        while(set.has(num)) {
          num = Math.floor((Math.random() * size));
        }
      }
      escolhidos = [...set];


      response.render('home', {
        busca: 'var query = '+ JSON.stringify(r) + ';',
        escolhidos: escolhidos
      })
    })
    .catch(function(e) {
      /* handle error */
      console.log("Erro");
      console.log(e);
    });

})

app.listen(8080)
