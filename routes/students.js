const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');


router.get('/', async(req, res) => {

  try {
    const data=await req.db.collection('students').find().toArray()
       res.render('students', { title: 'Students List', students: data });
   
  } catch (error) {
    console.log(error)
  }



});

router.get('/add', (req, res) => {
  res.render('add_student', { title: 'Add Student' });
});

router.post('/add', async(req, res) => {

  try {
    const student = {
      name: req.body.name,
      age: req.body.age,
      class: req.body.class,
    };
  
    await req.db.collection('students').insertOne(student)
      console.log('Student Added');
      res.redirect('/students');
  

  } catch (error) {
    
  }
})


router.post('/delete/:id', async(req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    await req.db.collection('students').deleteOne({ _id: id })
    
      console.log('Student Deleted');
      res.redirect('/students');
  } catch (error) {
    console.log(error)
  }

  });


module.exports = router;
