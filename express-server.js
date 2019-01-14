const app = require('express')();
const loki = require('lokijs');
const bodyParser = require('body-parser');
let schedules;
const db = new loki('loki.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/schedules', (req, res) => {
  console.log(req.body);
  return res.send(req.body)
});
const port = 3000;
app.listen(port, () => console.log(`expres running at http://localhost:${port}`));

// Helpers
function databaseInitialize() {
  schedules = db.getCollection("schedules");
  if (schedules === null) {
    schedules = db.addCollection("schedules");
    schedules.insert([
      {
        start: 12, count: 1, end: 13,
        category: '20190121', year: 2019, month: 1,
        day: 21, daysOfWeek: 4, title: '카카오와'
      },
      {
        start: 13, count: 1, end: 14,
        category: '20190121', year: 2019, month: 1,
        day: 21, daysOfWeek: 4, title: '구구릴'
      },
      {
        year: 2019, month: 1, day: 21, category: '20190121',
        start: 12, count: 1, end: 13, daysOfWeek: 4, title: '타이틀 입니다 1',
        content: '노래를 한다네 므매'
      },
      {
        year: 2019, month: 1, day: 22, category: '20190121',
        start: 13, count: 1, end: 14, daysOfWeek: 4, title: '타이틀 입니다 2'
      },
      {
        year: 2019, month: 1, day: 22, category: '20190121',
        start: 14, count: 1, end: 15, daysOfWeek: 4, title: '타이틀 입니다 3'
      },
      {
        year: 2019, month: 1, day: 22, category: '20190121',
        start: 15, count: 1, end: 16, daysOfWeek: 4, title: '타이틀 입니다 4'
      },
    ])
  }
}

