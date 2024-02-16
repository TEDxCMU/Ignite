// pages/api/getScores.js
import nextCors from 'next-cors';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function getScores(req, res) {
    // Run the CORS middleware
    await nextCors(req, res, {
        // Options here, such as which origins to allow
        methods: ['GET', 'POST', 'OPTIONS'],
        origin: '*', // Adjust this to restrict to specific origins as needed
        optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    if (req.method === 'GET') {
        try {
            await client.connect();
            const collection = client.db("leaderboard-database").collection("leaderboard-collection");
            const scores = await collection.find({}).sort({ score: -1 }).toArray();
            res.status(200).json(scores);
        } finally {
            await client.close();
        }
    } else {
        // If the request uses a method we don't support, return 405 Method Not Allowed
        res.status(405).end();
    }
}

export default getScores;
