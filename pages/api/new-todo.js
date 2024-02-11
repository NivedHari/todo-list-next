import {MongoClient} from 'mongodb'

// /api/new-meetup

async function handler(req, res) {
    if (req.method === "POST") {
      const data = req.body;
  
      const client = new MongoClient('mongodb+srv://nived123:nived123@todos.uoqfzyb.mongodb.net/?retryWrites=true&w=majority');
      
      try {
        await client.connect();
        
        const db = client.db();
        const todosCollection = db.collection('todos');
        const result = await todosCollection.insertOne(data);
        
        console.log(result);

        await client.close();
        
        res.status(201).json({ message: 'Inserted' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting meetup' });
      } 
        
      
    }
  }

export default handler;
