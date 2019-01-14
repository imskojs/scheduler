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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//TODO: validation

app.use(function (req, res, next) {
  if(!req.body) {
    return next();
  }
  next();
})
// post
app.post('/schedules', (req, res) => {
  const {month, category, start, end} = req.body;
  const overlaps = schedules.where(function (schedule) {
    if (schedule.category === category) {
      if (schedule.end > start && schedule.start <= end ||
        schedule.start < end && schedule.end > start
      ) {
        return true;
      }
    }
    return false;
  });
  if (overlaps.length) {
    return res.status(401).send({
      message: 'overlaps'
    });
  }
  schedules.insert(req.body);
  const updatedMonth = schedules.find({month});
  return res.send(updatedMonth);
});

// get
app.get('/schedules/:year/:month', (req, res) => {
  const {year, month} = req.params;
  console.log(year, month);
  const requestedMonth = schedules.where(function (obj) {
    return obj.year === +year && obj.month === +month;
  });
  return res.send(requestedMonth);
});

// put
app.put('/schedules', async (req, res) => {
  const id = req.body.$loki;
  schedules.remove({'$loki': id});
  const {month, category, start, end} = req.body;
  const overlaps = schedules.where(function (schedule) {
    if (schedule.category === category) {
      if (schedule.end > start && schedule.start <= end ||
        schedule.start < end && schedule.end > start
      ) {
        return true;
      }
    }
    return false;
  });
  if (overlaps.length) {
    return res.status(401).send({
      message: 'overlaps'
    });
  }
  delete req.body.$loki;
  schedules.insert(req.body);
  const updatedMonth = schedules.find({month});
  return res.send(updatedMonth);
});

app.delete('/schedules/:id', async (req, res) => {
  var x = schedules.remove({'$loki': req.params.id});
  const {month} = req.body;
  const updatedMonth = schedules.find({month});
  return res.send(updatedMonth);
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
        year: 2019, month: 1, day: 22, category: '20190122',
        start: 12, count: 1, end: 13, daysOfWeek: 4, title: '타이틀 입니다 1',
        content: '노래를 한다네 므매'
      },
      {
        year: 2019, month: 1, day: 22, category: '201901212',
        start: 13, count: 1, end: 14, daysOfWeek: 4, title: '타이틀 입니다 2'
      },
      {
        year: 2019, month: 1, day: 22, category: '20190122',
        start: 14, count: 1, end: 15, daysOfWeek: 4, title: '타이틀 입니다 3'
      },
      {
        year: 2019, month: 1, day: 22, category: '20190122',
        start: 15, count: 1, end: 16, daysOfWeek: 4, title: '타이틀 입니다 4'
      },
    ])
  }
}

