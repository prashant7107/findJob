const express = require('express');

const app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());




  app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Header","Origin, X-Requeested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
  });

  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

    //app.get('/api/search/:a', function(req, res) {
    app.get('/api/jobs/', function(req, res) {
      var _industry=req.query.industry;
      var _skills=req.query.skills;
       const test = function test() {


            let body = {

              size: 20,
              from: 0,

              query: {
                bool:{
                  should:[
                {
                match: {

                  category:{
                   query:_industry,
                 //  query: 'Education ',
                  fuzziness: 2
                  }
                }},
               {
                multi_match: {
                query: _skills,
               // query: 'sanima'  ,
                  fields: ['job_type', 'category','company'],
                  minimum_should_match: 1,
                  //fuzziness: 2
                }
              }
            ]
          } }
            };
            search('jobangular', body)

             .then(results => {

              var data = results.hits.hits.map(hit => hit._source);
             // var data=results.hits.hits;

              res.json({
                jobs:data
              });

            })
          };

         test();

           module.exports = {
             search
           };

    });




module.exports=app;
