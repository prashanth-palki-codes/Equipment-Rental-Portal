const express=require("express")
const mongodb=require("mongodb")
const cors=require("cors")
require("dotenv").config()

const mongoClient=mongodb.MongoClient
const objectId=mongodb.ObjectID
//Password--> I3IKzYg8TTpykdh1
const app=express()

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017"

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get("/checkUserExists/:useremail",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("MyRentalDB")
        let data = await db.collection("UsersCollection").find({ email : { $eq : req.params.useremail }}).toArray();
        res.status(200).json({data})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.post("/createNewUser",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("MyRentalDB")
        let data = await db.collection('UsersCollection').insertOne(req.body)
        res.status(200).json({message : "A New User is added"})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})


app.post("/createNewProduct",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("MyRentalDB")
        let data = await db.collection('ProductCollection').insertOne(req.body)
        res.status(200).json({message : "A New Product is added"})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.get("/getAllProductDetails",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("MyRentalDB")
        let data = await db.collection("ProductCollection").find().toArray();
        res.status(200).json({data})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.get("/getCartDetails",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("MyRentalDB")
        let data = await db.collection("CartCollection").find().toArray();
        res.status(200).json({data})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.post("/addToCart",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("MyRentalDB")
        let data = await db.collection('CartCollection').insertOne(req.body)
        res.status(200).json({message : "A New Product is added"})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.get("/getRentedDetails",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("MyRentalDB")
        let data = await db.collection("RentedCollection").find().toArray();
        res.status(200).json({data})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.put("/modifyProduct/:id",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL)
        let db = clientInfo.db("MyRentalDB")
        let data = await db.collection('ProductCollection').updateOne( { _id: objectId(req.params.id) } , { $set : req.body });
        res.status(200).json({message : "Product Modified"})
        clientInfo.close()
    } catch (error) {
        console.log(error)
        res.send(500)
    }
})

app.listen(port,()=>{
    console.log("App started at port :",port)
})