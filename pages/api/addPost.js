import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        if (data) {
            const { db } = await connectToDatabase();
        

            await db.collection('posts').insertOne(data,(err)=>{
                if(err){console.log(err); return};
                var objectId = data.objectId;
                console.log(objectId)
            })

            return res.status(200).json({ message: 'successful' })


        }
        return res.status(404).json({ message: 'error' })

    }
    return res.status(404).json({ message: 'Bad request' })
}


export default handler;