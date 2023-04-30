//import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        const postId = data.postId
        const userId = data.userId

        if (userId && postId) {
            const { db } = await connectToDatabase();

            const postId = new ObjectId(data.postId.toString())
            const userId = new ObjectId(data.userId.toString())

            const increaseLike = await db.collection("posts").updateOne({ _id: postId }, {
                $push: {
                    "likes":  userId 
                }
            })
          
            return res.status(200).json({ message: increaseLike })
        }
        return res.status(400).json({ message: 'no suitable data' })

    }
    return res.status(500).json({ message: 'Bad request' })
}
export default handler;