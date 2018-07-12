const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const safeString = require('safe-string')

const app = express()

const dps = require('dbpedia-sparql-client').default;// npm install dbpedia-sparql-client
const query = 'SELECT ?animal str(?nome) as ?Nome str(?ordem_label) as ?Ordem ?status ?data_extincao WHERE { ?animal dbo:class dbr:Mammal ; foaf:name ?nome ; dbo:order ?ordem . ?animal dbo:conservationStatus ?status . FILTER ((?ordem = dbr:Rodent) || (?ordem = dbr:Carnivora)) ?ordem rdfs:label ?ordem_label FILTER ( langMatches(lang(?ordem_label),"pt") ) FILTER ( (?status = "EX") || (?status = "EW") || (?status = "PE") || (?status = "PEW") || (?status = "CR") || (?status = "EN") || (?status = "VU") ) OPTIONAL { ?animal dbp:extinct ?data_extincao . } } ORDER BY ?status LIMIT 10';

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
      // mydata = r;
      // return r;
      // console.log(r["results"]["bindings"]);
      // console.log(r["results"]["bindings"].length + " entradas encontradas.");
      // console.log(mydata);
      // console.log(JSON.stringify(r));
      // console.log(safeString(JSON.stringify(r)));
      response.render('home', {
        name: "batata",
        // busca: JSON.stringify(mydata)//, null, 2)
        busca: JSON.stringify(r) 
      })
    })
    .catch(function(e) {
      /* handle error */
      console.log("Erro");
      console.log(e);
    });

})

app.listen(8080)
