import { MongoClient } from 'mongodb';

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        if (data) {
            const client = await MongoClient.connect(
                `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true }
            );
            const db = client.db();

            db.collection('posts').insertOne(data)

            return res.status(200).json({ message: 'successful' })


        }
        return res.status(404).json({ message: 'error' })

    }
    return res.status(404).json({ message: 'Bad request' })
}


export default handler;