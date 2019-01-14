const app = require('express')();
const port = 3000;
const loki = require('lokijs');
// $loki is ID
let schedules;
const db = new loki('loki.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

app.get('/schedule', (req, res) => {
  const data = schedules.find({month: 1});
  return res.send(data)
});


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

app.listen(port, () => console.log(`expres running at http://localhost:${port}`));
