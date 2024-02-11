import { MongoClient,ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = new MongoClient(
      "mongodb+srv://nived123:nived123@todos.uoqfzyb.mongodb.net/?retryWrites=true&w=majority"
    );

    try {
      await client.connect();

      const db = client.db();
      const todosCollection = db.collection("todos");
      const result = await todosCollection.insertOne(data);

      console.log(result);

      await client.close();

      res.status(201).json({ message: "Inserted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error inserting meetup" });
    }
  } else if (req.method === "PUT") {
    const id = req.body.id; 
    const { completed } = req.body; 

    console.log(id,completed);

    const client = new MongoClient(
      "mongodb+srv://nived123:nived123@todos.uoqfzyb.mongodb.net/?retryWrites=true&w=majority"
    );

    try {
      await client.connect();

      const db = client.db();
      const todosCollection = db.collection("todos");


      const result = await todosCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { completed: completed } }
      );


      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Todo updated successfully" });
      } else {
        res.status(404).json({ message: "Todo not found" });
      }

      await client.close();
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default handler;
