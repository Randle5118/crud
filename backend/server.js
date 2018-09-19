// analysis => 分析
// bodyparse is use to analysis the post data

import express from 'express'
import mongodb from 'mongodb'
import bodyParser from 'body-parser'

const app = express();
// use bodyParser to get the post data
app.use(bodyParser.json());
// crud is the databasename
const dbUrl = "mongodb://localhost"

// background verification 
const validata = (data) => {
 
    let errors = {};
    if (data.title === '') errors.title = "Title can't be empty"
    if (data.cover === '') errors.cover = "Cover can't be empty"

    const isValid = Object.keys(errors).length === 0   

    return { errors , isValid}
}

// mongodbe to connect db
mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if(err) throw err;
    const db = client.db('crud')

    // add new 
    app.get('/api/pictures', (req , res) =>{
        // collection　=> 採集
        // collection is like talbe in database
        // find is like select in database , when find is empty , its mean find all.
        // toArray is mean, let the database to be array
        db.collection('pictures').find({}).toArray((err, pictures) => {
            // find the array and change to json.
            res.json({ pictures })
        })
    })

    // edit
    // :_id is mean the _id is a dynamic params
    app.get('/api/pictures/:_id', (req , res) =>{
        // collection to pictures and findOne by id In mongodb , and get the data call picture , response to json 
        db.collection('pictures').findOne({ _id: new mongodb.ObjectID(req.params._id)}, (err, picture) => {
            res.json({ picture });
        })
    })  

    app.delete('/api/pictures/:_id', (req , res) =>{
        // collection to pictures and findOne by id In mongodb , and get the data call picture , response to json 
        db.collection('pictures').deleteOne({ _id: new mongodb.ObjectID(req.params._id)}, (err, picture) => {
            if(err){ res.status(500).json({ errors: { global: err } }); return; }
            res.json({ picture });
        })
    })  


    app.put('/api/pictures/:_id', (req, res) => {
        const { errors, isValid }  = validata(req.body);
        if(isValid){
            const { title, cover } = req.body; 
            db.collection('pictures').findOneAndUpdate(
                { _id: new mongodb.ObjectId(req.params._id) },
                { $set: { title , cover }},
                { returnOriginal: false },
                ( err, result ) => {
                    if(err){ res.status(500).json({ errors: { global: err } }); return; }
                    res.json({ picture: result.value })
                }
            )
        }else{
            res.status(400).json({ errors })
        }
    })

    // Verification　=> 驗證 , function => 功能
    // when you make a post fountin , you have to make a verification function.
    app.post('/api/pictures', (req , res) => {
        const { errors, isValid }  = validata(req.body);
        if(isValid){
            const { title, cover } = req.body;
                    // result => 結果
            db.collection('pictures').insertOne( { title, cover },  ( err, result ) => {
                if(err){
                    res.status(500).json({ errors: { global:"Somehing went wrong " }})
                }else{
                    // result.ops is from mongodb , result.ops can added a new data 
                    res.json({ picture: result.ops[0] })
                }
            })
        }else{
            res.status(400).json({ errors })
        }
    }) 

    // when we send a requst to background , they will check the api address.
    // but , when they cant find the api , they will run this↓
    // then you back the 404 page to front , and send the message .
    app.use((req, res) => {
        res.status(404).json({
            errors:{
                global: "Still working on it. Please try again later than when we implement it"
            }
        })
    })

    app.listen(8080 , () => console.log('Server is running on localhost8080'));
})

