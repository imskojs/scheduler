const app = require('express')();
const port = 3000;

app.get('/schedule', (req, res) => {
  return res.send('data sent')
});

app.listen(port, () => console.log(`expres running at http://localhost:${port}`));
