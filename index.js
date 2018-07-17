const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const favicon = require('express-favicon');

const app = express()

const dps = require('dbpedia-sparql-client').default;// npm install dbpedia-sparql-client
const query = 'select distinct * where { ?animal dbo:kingdom dbr:Animal; dbo:phylum ?filo ; dbo:class ?classe; foaf:name ?nome ; rdfs:label ?label; dbo:abstract ?abstract; rdfs:comment ?comment; foaf:isPrimaryTopicOf ?link_wikipedia; dbo:thumbnail ?thumbnail filter(lang(?label) = "pt" && lang(?abstract) = "pt" && lang(?comment) = "pt") filter( ?classe = dbr:Chondrichthyes || ?classe = dbr:Actinopterygii || ?classe = dbr:Osteichthyes || ?classe = dbr:Amphibia || ?classe = dbr:Sauropsida || ?classe = dbr:Reptilia || ?classe = dbr:Aves || ?classe = dbr:Mammalia  ) } order by ?classe';
var tools = require("./tools.js");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webso-6209b.firebaseio.com"
});

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
    log_in_route: 'Batata',
    sign_up_route: 'potato',
    ranking: 'nada ainda',
    play_route: "/game"
  })
})

app.get('/game', (request, response) => {
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
      var result = r["results"]["bindings"];

      escolhidos = tools.makeRandom(size);
      ordem = tools.makeRandom(3);
      // console.log("aqui");
      // console.log(escolhidos);
      // console.log(ordem);
      // console.log([escolhidos[ordem[0]], escolhidos[ordem[1]], escolhidos[ordem[2]]]);
      // console.log("/aqui");
      animais = [result[escolhidos[ordem[0]]], result[escolhidos[ordem[1]]], result[escolhidos[ordem[2]]]]
      animais[0]["is_correct"] = false;
      animais[1]["is_correct"] = false;
      animais[2]["is_correct"] = false;
      index = Math.floor((Math.random() * 3));
      animal_correto = animais[index];
      animais[index]["is_correct"] = true;
      // console.log(animais);


      response.render('game', {
        // busca: 'var query = '+ JSON.stringify(r) + ';',
        animais: animais,
        correto: animal_correto
      })
    })
    .catch(function(e) {
      /* handle error */
      console.log("Erro");
      console.log(e);
    });

})

app.listen(8080)
