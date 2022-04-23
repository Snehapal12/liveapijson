let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 8230;
//const mongoUrl = "mongodb://localhost:27017";
const mongoUrl = "mongodb+srv://user:user1234@cluster0.mpgff.mongodb.net/health?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const cors = require('cors');
//const token = "8fbf8tyyt87378";

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send("Welcome to Express")
})

//city

app.get('/city', (req, res) => {
    db.collection('city').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})

//popularsearch
app.get('/popularsearch', (req, res) => {
    db.collection('popularsearch').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})
//doctor
app.get('/doctor', (req, res) => {
    let query = {};
    let diseaseId = Number(req.query.disease_id)
    if (diseaseId) {
        query = { disease_id: diseaseId }
    }

    db.collection('doctor').find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})

//pristncare
// app.get('/pristyncare', (req, res) => {
//     db.collection('pristyncare').find().toArray((err, result) => {
//         if (err) throw err;
//         res.send(result)
//     })

// })


//disease
app.get('/disease', (req, res) => {
    db.collection('disease').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})


//restaurants
app.get('/pristyncare/', (req, res) => {
    // let id = req.params.id;
    // let id  = req.query.id
    // console.log(">>>id",id)
    let query = {};
    let stateId = Number(req.query.state_id)
    let diseaseId = Number(req.query.disease_id)
    if (stateId) {
        query = { state_id: stateId }
    } else if (diseaseId) {
        query = { 'disease.disease_id': diseaseId }
    }

    db.collection('pristyncare').find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

//restaurantDetails
app.get('/details/:id', (req, res) => {
    //let restId = Number(req.params.id);
    let restId = mongo.ObjectId(req.params.id)
    db.collection('pristyncare').find({ _id: restId }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})


//menu
// app.get('/menu', (req, res) => {
//     let query = {}
//     let restId = Number(req.query.restId)
//     if (restId) {
//         query = { restaurant_id: restId }
//     }
//     db.collection('menu').find(query).toArray((err, result) => {
//         if (err) throw err;
//         res.send(result)
//     })
// })

// // menu on basis of id
// app.post('/menuItem', (req, res) => {
//     console.log(req.body);
//     if (Array.isArray(req.body)) {
//         db.collection('menu').find({ menu_id: { $in: req.body } }).toArray((err, result) => {
//             if (err) throw err;
//             res.send(result)
//         })
//     } else {
//         res.send('Invalid Input')
//     }
// })

// // place Order
// app.post('/placeOrder', (req, res) => {
//     db.collection('orders').insert(req.body, (err, result) => {
//         if (err) throw err;
//         res.send('Order Placed')
//     })
// })


// // View Order
// app.get('/viewOrder', (req, res) => {
//     let email = req.query.email;
//     let query = {};
//     if (email) {
//         query = { "email": email }
//     }
//     db.collection('orders').find(query).toArray((err, result) => {
//         if (err) throw err;
//         res.send(result)
//     })
// })

// // delete order
// app.delete('/deleteOrders', (req, res) => {
//     db.collection('orders').remove({}, (err, result) => {
//         res.send('order deleted')
//     })
// })


// //update orders
// app.put('/updateOrder/:id', (req, res) => {
//     let oId = mongo.ObjectId(req.params.id);
//     db.collection('orders').updateOne(
//         { _id: oId },
//         {
//             $set: {
//                 "status": req.body.status,
//                 "bank_name": req.body.bankName
//             }
//         }, (err, result) => {
//             if (err) throw err
//             res.send(`Status Updated to ${req.body.status}`)
//         }
//     )
// })

// Connection with db
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log(`Error while connecting`);
    db = client.db('health');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})