var dps = require('dbpedia-sparql-client').default;// npm install dbpedia-sparql-client
var query = 'SELECT ?animal str(?nome) as ?Nome str(?ordem_label) as ?Ordem ?status ?data_extincao WHERE { ?animal dbo:class dbr:Mammal ; foaf:name ?nome ; dbo:order ?ordem . ?animal dbo:conservationStatus ?status . FILTER ((?ordem = dbr:Rodent) || (?ordem = dbr:Carnivora)) ?ordem rdfs:label ?ordem_label FILTER ( langMatches(lang(?ordem_label),"pt") ) FILTER ( (?status = "EX") || (?status = "EW") || (?status = "PE") || (?status = "PEW") || (?status = "CR") || (?status = "EN") || (?status = "VU") ) #EX - extinct #EW - extinct in the wild #CR - critically endangered #EN - endangered #VU - vulnerable OPTIONAL { ?animal dbp:extinct ?data_extincao . } } ORDER BY ?status';

var mydata = dps.client()
  .query(query)
  .timeout(15000) // optional, defaults to 10000
  .asJson() // or asXml()
  .then(function(r) { /* handle success */ })
  .catch(function(e) { /* handle error */ });

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hi everybo!');
  res.end('AAAAa');
  res.end(query);
  console.log(mydata[0]);

});

server.listen(8080);
