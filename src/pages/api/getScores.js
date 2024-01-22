// pages/api/getScores.js
// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// async function getScores(req, res) {
//     try {
//         await client.connect();
//         const collection = client.db("leaderboard-database").collection("leaderboard-collection");
//         const scores = await collection.find({}).sort({ score: -1 }).toArray();
//         res.status(200).json(scores);
//     } finally {
//         await client.close();
//     }
// }

// export default getScores;
