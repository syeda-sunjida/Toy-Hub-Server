const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
require('dotenv').config()
//middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mhlikac.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        
        // await client.connect();

        const serviceCollection = client.db('toyHub').collection('toy');
        const allToyCollection = client.db('toyHub').collection('allToys');
        app.get('/toy', async (req, res) => {
            const cursor = serviceCollection.find();
            const result = await cursor.toArray();
            res.send(result);

         })
        // app.get('/services/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) }

        //     const options = {
        //         projection: { title: 1, price: 1, service_id: 1 }
        //     }
        //     const result = await serviceCollection.findOne(query, options);
        //     res.send(result);
        // })

        // //bookings
        app.get('/allToys', async (req, res) => {
            console.log(req.query.email);
            let query={};
            if(req.query?.email){
               query = {SellerEmail: req.query.email} 
            }
            const result = await allToyCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/allToys', async (req, res) => {
            const booking = req.body;
            console.log(booking);
            const result = await allToyCollection.insertOne(booking);
            res.send(result);
        });

        // app.patch('/bookings/:id', async(req, res)=> {
        // const updateBooking = req.body;
        // console.log(updateBooking);
        // const updateDoc = {
        //     $set: {
        //         status: updateBooking.status
        //     },
        // };
        // const result = await bookingCollection.updateOne(filter, updateDoc);
        // res.send(result);
        // })
        // app.delete('/bookings/:id', async(req, res)=> {
        //     const id = req.params.id;
        //     const query= { _id: new ObjectId(id)}
        //     const result = await bookingCollection.deleteOne(query);
        //     res.send(result);
        // })

        
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('doc running')
})
app.listen(port, () => {
    console.log(`car server running on port ${port}`)

})