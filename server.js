require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
const serialize = require('serialize-javascript');

app.use('/public', express.static(path.join(__dirname, 'public')));

let events=[
  {eventId:"default001",description: "Random event 1", date: moment('2018-12-24','YYYY-MM-DD')},
  {eventId:"default002",description: "Random event 2", date: moment('2018-12-25','YYYY-MM-DD')},
  {eventId:"default003",description: "Random event 3", date: moment('2018-12-29','YYYY-MM-DD')}
]

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  let contentMarker = '<!--APP-->';
  res.send(template.replace(contentMarker,`<script>var __INITIAL_STATE__= ${serialize(events)}</script>`));

});


app.use(require('body-parser').json());
app.post('/event',(req,res)=>{
  console.log(req.body);
  events.push(req.body);
  res.sendStatus(200);
});

app.delete('/event/:eventId',(req,res)=>{
  console.log(req.params.eventId)
  events.splice(events.findIndex((obj => obj.eventId == req.params.eventId)),1);
  res.sendStatus(200);
});

app.put('/event',(req,res)=>{
  let index = events.findIndex((obj => obj.eventId == req.body.eventId));
  events[index].description = req.body.description;
  res.sendStatus(200);
});


const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
});
