// pages/api/addScore.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function addScore(req, res) {
    if (req.method === 'POST') {
        try {
            await client.connect();
            const collection = client.db("leaderboard-database").collection("leaderboard-collection");
            const result = await collection.insertOne(req.body);
            res.status(201).json(result);
        } finally {
            await client.close();
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

export default addScore;
