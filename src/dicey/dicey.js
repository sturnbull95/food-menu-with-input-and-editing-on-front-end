// dicey.js
var fs = require('fs');
var express = require('express');
var hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

var obj = {};
var arr = [];
var newArr = [];
var newObj = {};
newObj["star"] = "*";
newObj["comma"] = ",";
newObj["dash"] = "-";
newObj["none"] = "";
newObj["space"] = " ";


  fs.readFile('diceware.wordlist.txt','utf8', (err, data) => {
    if (err) throw err;
    arr = data.split("\n");
    for(var i = 0; i < arr.length; i++){
      newArr[i] = arr[i].split("\t");
    }
    for(var i = 0; i < newArr.length -1; i++){
        obj[newArr[i][0]] = newArr[i][1];
    }
  });
  function getWords(num,glue){
    var myArr = [];
    myArr = getRandom(num);
    var wordString = "";
    var numString = "";
    var nameString = "";
    var newestArr = [3];
    for(var i = 0; i < myArr.length; i++){
      wordString += obj[myArr[i]];
      numString += myArr[i] + " ";
      nameString += obj[myArr[i]] + " ";
      if(i != myArr.length-1){
        wordString += newObj[glue];
      }
    }
    newestArr[0] = wordString;
    newestArr[1] = numString;
    newestArr[2] = nameString;

    return newestArr;
  }
app.get('/dice', function(req, res) {
  var number = 0;
  var sep = "";
  var arrNum = [];
  //if(req.query["numWords"] != undefined){
    if(req.query["glue"] == "" || newObj[req.query["glue"]] == undefined){
      console.log("ugh");
      sep = "space";
    }
    else{
      sep = req.query["glue"];
    }
    number = req.query["numWords"];

    var finalArr = getWords(number,sep);

    res.render("diceWithQuery",{css_file: "/css/base.css",
    'word': finalArr[0],'nums': finalArr[1],'names': finalArr[2]});
  //}
  // else{
  //   res.render("dice",{css_file: "/css/base.css"});
  // }
});


app.get('/about', function(req,res){
  res.render("aboutMarkup",{css_file: "/css/base.css"});
});


app.get('/', function(req,res){
  res.redirect('/dice');
});

function getRandom(num){
  var arr = [];
  for(var i = 0; i < num; i++){
    for(var x = 0; x < 5; x++){
      if(arr[i] == undefined){
        arr[i] = Math.floor((Math.random() * 6) + 1);
      }
      else{
        arr[i] += "" + Math.floor((Math.random() * 6) + 1);
      }
    }
  }
  return arr;
}

app.listen(8080);


module.exports = {
  getWords: getWords
};
