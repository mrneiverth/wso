var dps = require('dbpedia-sparql-client').default;// npm install dbpedia-sparql-client
var query = 'SELECT ?animal str(?nome) as ?Nome str(?ordem_label) as ?Ordem ?status ?data_extincao WHERE { ?animal dbo:class dbr:Mammal ; foaf:name ?nome ; dbo:order ?ordem . ?animal dbo:conservationStatus ?status . FILTER ((?ordem = dbr:Rodent) || (?ordem = dbr:Carnivora)) ?ordem rdfs:label ?ordem_label FILTER ( langMatches(lang(?ordem_label),"pt") ) FILTER ( (?status = "EX") || (?status = "EW") || (?status = "PE") || (?status = "PEW") || (?status = "CR") || (?status = "EN") || (?status = "VU") ) OPTIONAL { ?animal dbp:extinct ?data_extincao . } } ORDER BY ?status';
// var query = 'SELECT DISTINCT ?Concept WHERE {[] a ?Concept} LIMIT 10';


var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hi everybody!');
  res.end('AAAAa');
  res.end(query);
  console.log(mydata[0]);

});

server.listen(8080);

server.on('request', function(req,res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h2> Olá mundo! </h2>');
});

var mydata = dps.client()
  .query(query)
  .timeout(15000) // optional, defaults to 10000
  .asJson() // or asXml()
  .then(function(r) {
    /* handle success */
    console.log("Sucesso");
    console.log(r["results"]["bindings"]);
    console.log(r["results"]["bindings"].length + " entradas encontradas.");
  })
  .catch(function(e) {
    /* handle error */
    console.log("Erro");
    console.log(e);
  });
