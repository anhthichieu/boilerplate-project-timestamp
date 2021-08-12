// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/** MY SOLUTION **/
/*
app.get("/api/:date?", function(req, res) {
  const { date } = req.params;
  let unixTimestamp, utcTimestamp;

  if (Number(date)) {
    unixTimestamp = Number(date);
    utcTimestamp = new Date(Number(date)).toUTCString();
  } else if (date === undefined) {
    unixTimestamp = new Date().getTime()
    utcTimestamp = new Date().toUTCString()
  } else {
    unixTimestamp = new Date(date).getTime();
    utcTimestamp = new Date(date).toUTCString();
  }
  if (!unixTimestamp) {
    res.json({
      error: utcTimestamp
    });
  } else {
    res.json({
      unix: unixTimestamp,
      utc: utcTimestamp
    });
  }
});

*/

/** FROM A DUC **/
// https://bespokify.slack.com/archives/DJBRRKQET/p1628678065015800

app.get("/api/:date?", function(req, res) {
  const { date } = req.params;
  let time = new Date();

  if (typeof date === "string") {
    if (Number(date)) {
      time = new Date(Number(date));
    } else {
      time = new Date(date);
    }
  }

  const unixTimestamp = time.getTime();
  const utcTimestamp = time.toUTCString();

  if (!unixTimestamp) {
    res.json({
      error: utcTimestamp
    });
    return;
  }

  res.json({
    unix: unixTimestamp,
    utc: utcTimestamp
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
