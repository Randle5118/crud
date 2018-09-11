import express from 'express'
import mongodb from 'mongodb'

const app = express();

// crud is the databasename
const dbUrl = "mongodb://localhost"

// mongodbe to connect db
mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if(err) throw err;

    const db = client.db('crud')

    app.get('/api/pictures', (req , res) =>{
        // collection is like talbe in database
        // find is like select in database , when find is empty , its mean find all.
        // toArray is mean, let the database to be array
        db.collection('pictures').find({}).toArray((err, pictures) => {
            // find the array and change to json.
            res.json({ pictures })
        })
    })

    app.listen(8080 , () => console.log('Server is running on localhost8080'));
})

