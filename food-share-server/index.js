require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wov5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const foodcollection = client.db("foodDB").collection("foods");

    // Get Data from DB sorted by expiredDateTime
    app.get("/foods", async (req, res) => {
      const { sortOrder } = req.body;
      const cursor = foodcollection.find().sort({ expiredDateTime: sortOrder });
      const result = await cursor.toArray();
      res.send(result);

    });

    // Get data by ID
    app.get("/foods/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodcollection.findOne(query);
      res.send(result);
    });

    // Get data by update ID
    app.get("/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodcollection.findOne(query);
      res.send(result);
    });

    // Add New Data
    app.post("/foods", async (req, res) => {
      const newUser = req.body;
      const result = await foodcollection.insertOne(newUser);
      res.send(result);
    });

    // Delete Data
    app.delete("/foods/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodcollection.deleteOne(query);
      res.send(result);
    });

    // Update Data as request
    app.put("/foods/:id", async (req, res) => {
      const id = req.params.id;
      const updatedFood = req.body;
      const options = { upsert: true };
      const filter = { _id: new ObjectId(id) };
      const food = {
        $set: {
          additionalNotes: updatedFood.additionalNotes,
          foodStatus: "Requested",
          userEmail: updatedFood.userEmail,
          requestDate: updatedFood.requestDate,
        },
      };
      const result = await foodcollection.updateOne(filter, food, options);
      res.send(result);
    });

    // Data Update
    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const updatedFood = req.body;
      const options = { upsert: true };
      const filter = { _id: new ObjectId(id) };
      const food = {
        $set: {
          foodName: updatedFood.foodName,
          foodImage: updatedFood.foodImage,
          foodQuantity: updatedFood.foodQuantity,
          pickupLocation: updatedFood.pickupLocation,
          expiredDateTime: updatedFood.expiredDateTime,
          additionalNotes: updatedFood.additionalNotes,
          donatorImage: updatedFood.donatorImage,
          donatorName: updatedFood.donatorName,
          donatorEmail: updatedFood.donatorEmail,
          foodStatus: updatedFood.foodStatus,
        },
      };
      const result = await foodcollection.updateOne(filter, food, options);
      res.send(result);
    });

    console.log("You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Food Server Running.");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
