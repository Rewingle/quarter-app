//import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        if (data) {
           /*   const client = await MongoClient.connect(
                `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true }
            ); 
            const db = client.db() */
            const {db} = await connectToDatabase();
            console.log(data)
            if (data.postId && data.comment) {
                
                const postId = new ObjectId(data.postId.toString())
                const userId = new ObjectId(data.userId.toString())
                console.log(data.date)
                const comment = await db.collection("posts").updateOne({ _id: postId }, {
                    $push: {
                        "comments": {
                            userId: userId,
                            userName: data.userName,
                            fullName: data.fullName,
                            text: data.comment,
                            date: data.date,
                            photo: null,
                            likes: 0,
                        }
                    }
                })
                console.log(comment)
                client.close()
                return res.status(200).json({ message: 'successful' })

                
            }
            client.close()
            return res.status(404).json({ message: 'error' })

        }

    }
    return res.status(404).json({ message: 'Bad request' })
}
export default handler;