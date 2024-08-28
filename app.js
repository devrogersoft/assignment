const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { getDb } = require('./util/mongoconnect'); 

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    try {
      req.db = await getDb();
      next();
    } catch (err) {
      res.status(500).send('Database connection error1');
    }
  });
  

app.use('/students', require('./routes/students'));

app.use(async (req, res, next) => {
  try {
    req.db = await getDb();
    next();
  } catch (err) {
    res.status(500).send('Database connection error');
  }
});

// Homepage
app.get('/', (req, res) => {
  res.render('index', { title: 'Student Management' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
