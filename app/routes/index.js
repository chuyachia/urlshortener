'use strict';
 var SearchHandle  = require(process.cwd() +'/app/controllers/searchHandle.js');


module.exports = function(app,db){
  var searchhandle = new SearchHandle(db);
  
  app.route('/').get(function(req,res) {
    res.sendFile(process.cwd() + '/views/index.html');
 });
  
  app.route('/new/*').get(searchhandle.addurl);
  app.route(/\/(\d+)/).get(searchhandle.directourl);
}