const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
    console.log('db connected')
}

const cardSchema = new mongoose.Schema({
    id: Number,
    title:String
    
  });
const listSchema = new mongoose.Schema({
    id: Number,
    parentId:Number,
    title:String
    
  });

  const Card = mongoose.model('Card', cardSchema);
  const List = mongoose.model('List', listSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post('/demo',async (req,res)=>{
    let card = new Card();
    card.id = req.body.id;
    card.title = req.body.title;
    const doc = await card.save();

    let payload = req.body;
    console.log(doc);
    res.json(doc);
})
server.post('/demo',async (req,res)=>{

    let list = new List();
    list.id = req.body.id;
    list.parentId = req.parentId;
    list.title = req.body.title;
    const doc1 = await list.save();

    let payload = req.body;
    console.log(doc1);
    res.json(doc1);
})

// server.get('/demo',async (req,res)=>{
//     const docs = await Card.find({});
//     res.json(docs)
// })
// server.get('/demo',async (req,res)=>{
//     const docs = await List.find({});
//     res.json(docs)
// })

server.listen(8080,()=>{
    console.log('server started')
})

