const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;


router.get('/', (req, res) => {
  req.db.collection('students').find().toArray((err, result) => {
    if (err) return console.error(err);
    res.render('students', { title: 'Students List', students: result });
  });
});

router.get('/add', (req, res) => {
  res.render('add_student', { title: 'Add Student' });
});

router.post('/add', (req, res) => {
  const student = {
    name: req.body.name,
    age: req.body.age,
    class: req.body.class,
  };

  req.db.collection('students').insertOne(student, (err, result) => {
    if (err) return console.error(err);
    console.log('Student Added');
    res.redirect('/students');
  });
});

router.post('/delete/:id', (req, res) => {
  const id = new require('mongodb').ObjectID(req.params.id);
  req.db.collection('students').deleteOne({ _id: id }, (err, result) => {
    if (err) return console.error(err);
    console.log('Student Deleted');
    res.redirect('/students');
  });
});

module.exports = router;
