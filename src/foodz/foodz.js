// foodz.js
var fs = require('fs');
var express = require('express');
var hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
var arr = [];
var obj = {};
arr[0] = {name: "chocoramen", description: "ramen noodles in a chocolate almond milk broth",
category: "breakfast"};
arr[1] = {name: "lycheezy", description: "cheese pizza with lychee on top",
category: "anytime"};
arr[2] = {name: "crazy cookie", description: "a 1 foot diameter cookie",
category: "dinner"};

app.get('/', function(req, res) {
  var temp = {};
  if(req.query["filterCategory"] == "breakfast"){
    for(var i = 0; i < arr.length; i++){
      if(arr[i]["category"] == "breakfast"){
        temp = arr[i];
      }
    }
    res.render("home",{css_file: "/css/base.css","breakFastName": temp["name"], "breakFastCat": temp["category"],
  "breakFastDesc": temp["description"]})
  }
  if(req.query["filterCategory"] == "lunch"){
    for(var i = 0; i < arr.length; i++){
      if(arr[i]["category"] == "lunch"){
        temp = arr[i];
      }
    }
    res.render("home",{css_file: "/css/base.css","lunchName": temp["name"], "lunchCat": temp["category"],
  "lunchDesc": temp["description"]})
  }
  if(req.query["filterCategory"] == "dinner"){
    for(var i = 0; i < arr.length; i++){
      if(arr[i]["category"] == "dinner"){
        temp = arr[i];
      }
    }
    res.render("home",{css_file: "/css/base.css","dinnerName": temp["name"], "dinnerCat": temp["category"],
  "dinnerDesc": temp["description"]})
  }
  if(req.query["filterCategory"] == "anytime"){
    for(var i = 0; i < arr.length; i++){
      if(arr[i]["category"] == "anytime"){
        temp = arr[i];
      }
    }
    res.render("home",{css_file: "/css/base.css","anytimeName": temp["name"], "anytimeCat": temp["category"],
  "anytimeDesc": temp["description"]})
  }
    res.render("home",{css_file: "/css/base.css","firstName": arr[0]["name"],"firstDesc": arr[0]["description"],
  "firstCat": "(" +arr[0]["category"]+ ")","secondName": arr[1]["name"],"secondDesc": arr[1]["description"],
  "secondCat": "(" +arr[1]["category"]+ ")","thirdName": arr[2]["name"],"thirdDesc": arr[2]["description"],
  "thirdCat": "(" +arr[2]["category"] + ")"});
});
app.listen(8080);
