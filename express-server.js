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
  if (!req.body) {
    return next();
  }
  next();
});
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
app.get('/schedules/:year/:month/:day', (req, res) => {
  const {year, month, day} = req.params;
  if(+day === 99) {
    const requestedMonth = schedules.where(function (obj) {
      return obj.year === +year && obj.month === +month;
    });
    return res.send(requestedMonth);
  }
  const timestamp = toTimestamp({year: +year, month: +month, day: +day});
  const MILLIDAY = 24 * 60 * 60 * 1000;
  const beginning = timestamp - MILLIDAY * 7;
  const end = timestamp + MILLIDAY * 7;
  const requestedWeek = schedules.where(function(obj){
    return obj.timestamp > beginning && obj.timestamp < end;
  });
  return res.send(requestedWeek);
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
  schedules.remove({'$loki': req.params.id});
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
  }
}

function toTimestamp(simpleDateTime) {
  const {year, day, hour = 0, minute = 0} = simpleDateTime;
  let {month} = simpleDateTime;
  const date = new Date(year, --month, day, hour, minute);
  return date.getTime();
}
