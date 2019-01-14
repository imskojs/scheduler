const app = require('express')();
const port = 3000;
const loki = require('lokijs')
const db = new loki();
const schedules = db.addCollection('schedules');
// $loki is ID
schedules.insert({month: 1})
schedules.insert({month: 1})
schedules.insert({month: 1})
schedules.insert({month: 1})

app.get('/schedule', (req, res) => {
  const data = schedules.find({month: 1});
  return res.send(data)
});

app.listen(port, () => console.log(`expres running at http://localhost:${port}`));
