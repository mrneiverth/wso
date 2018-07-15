const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const dps = require('dbpedia-sparql-client').default;// npm install dbpedia-sparql-client
const query = 'select * WHERE { ?animal dbo:kingdom dbr:Animal ; foaf:name ?nome ;rdfs:label ?label;dbo:abstract ?abstract;rdfs:comment ?comment;foaf:isPrimaryTopicOf ?link_wikipedia;dbo:thumbnail ?thumbnail filter(lang(?label) = "pt" && lang(?abstract) = "pt" && lang(?comment) = "pt") } limit 100';

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
      response.render('home', {
        name: "batata",
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
