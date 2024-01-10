const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'juandb';

// Collection Names
const accountUserCollectionName = 'accountUser';

const client = new MongoClient(url);

app.use(cors()); // Move this line to apply CORS to all routes

app.use(bodyParser.json());

app.post('/createAccount', async (req, res) => {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB successfully');

    // Get the database and collection
    const db = client.db(dbName);
    const accountUserCollection = db.collection(accountUserCollectionName);

    // Insert data into the collection
    const { name, email, password } = req.body;
    const result = await accountUserCollection.insertOne({ name, email, password });

    // Respond to the client
    res.json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error('Error handling createAccount request:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
