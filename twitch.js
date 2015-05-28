var request = require('request');
fs = require('fs');
var users = fs.readFileSync('dict.txt').toString().split("\n");
var host = 'api.twitch.tv/kraken/users/';
var users = users.map(function (user) {
  return 'https://' + host + user;
});

function displayResult(message) {
  fs.appendFile('results.txt', message+'\n', function (err) {
    if (err) throw err;
    console.log(message);
  });
}

function callAPIs ( host, users ) {
  var API = users.shift();
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
    if( users.length ) {
      callAPIs ( host, users );
    }
  });
}

callAPIs( host, users );
