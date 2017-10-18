'use strict';

const url = require('url');

function searchHandle(db) {
  var collect = db.collection('url_shortener')
  
  this.addurl = function(req,res) {
    if (urlvalid) {
      var new_ent = {}
      new_ent['url']  = req.params[0];
      collect.findOne({url:new_ent['url']},function(err,result){
        if (err) throw err;
        if (result) {
          var shortened = { "original_url":result.url, "short_url":"https://urlshortener-chuya.glitch.me/"+result.shortnum};
          res.send(JSON.stringify(shortened));
        } else {
          collect.count({}, function(err, n){
            if (err) throw err;
            new_ent['shortnum'] = n+1;
            collect.insert(new_ent,function(err,result){
              if (err) throw err;
              console.log('new entry added to database');
              var shortened = { "original_url":new_ent['url'], "short_url":"https://urlshortener-chuya.glitch.me/"+new_ent['shortnum']};
              res.send(JSON.stringify(shortened));
            })
          }) 
        }
      })      
    } else {
      res.send('Not a valid URL');
    }   
  }
  
  var urlvalid = function(str) {
    if (url.parse(str).host) {
      return true
    }
    else {
      return false
    }
  }
  
  this.directourl = function(req,res) {
    var query = { shortnum: Number(req.params[0])};
    collect.findOne(query,function(err,result){
      if (err) throw err;
      res.redirect(result.url);
    })
  }
}

module.exports = searchHandle;