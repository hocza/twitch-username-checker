var request = require('request');
fs = require('fs');
var array = fs.readFileSync('dict.txt').toString().split("\n");
var USERs = array;
var host = 'api.twitch.tv/kraken/users/';
var USERs = USERs.map(function (api) {
  return 'https://' + host + api;
});

function displayResult(message) {
  fs.appendFile('results.txt', message+'\n', function (err) {
    if (err) throw err;
    console.log(message);
  });
}

function callAPIs ( host, USERs ) {
  var API = USERs.shift();
  request(API, function(err, res, body) {
    var obj = JSON.parse(body);
    if(obj.error)
    {
      displayResult(obj.message);
    }
    else
    {
      displayResult('User ' + obj.name + ' do exists since: ' + obj.updated_at.replace(/Z/, ' ').replace(/T/, ' ').replace(/\..+/, '') );
    }
    if( USERs.length ) {
      callAPIs ( host, USERs );
    }
  });
}

callAPIs( host, USERs );
