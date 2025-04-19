const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

const bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'passManager';

client.connect(); 

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const filteredDocs = await collection.find({}).toArray();
  res.json(filteredDocs);
})


app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const filteredDocs = await collection.insertOne(password);
  res.send({sucess   : true});
})

app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const filteredDocs = await collection.deleteOne(password);
  res.send({sucess   : true});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})