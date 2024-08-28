const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'studentDB';

let db = null;
let client = null;

const getClient = async () => {
  if (!client) {
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to Database');
    } catch (err) {
      console.error('Failed to connect to Database:', err);
      throw err;
    }
  }
  return client;
};

const getDb = async () => {
  if (!db) {
    try {
      client = await getClient();
      db = client.db(dbName);
    } catch (err) {
      console.error('Failed to get Database:', err);
      throw err;
    }
  }
  return db;
};

module.exports = { getDb };
