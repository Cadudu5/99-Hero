
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://xbx5ZLgMapv8sFwS:xbx5ZLgMapv8sFwS@cluster0.wirna.mongodb.net/bdheroes?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
