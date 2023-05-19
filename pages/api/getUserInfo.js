//import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)

        // location = address[{province},{district},{neighborhood}]

        if (data.userName) {
            const { db } = await connectToDatabase();

            const response = await db.collection('users').findOne({ userName: data.userName })
            console.log(response)
            const user = JSON.parse(JSON.stringify(response))

            res.status(200).json(user)
        }
        else{
            res.status(400).json({message: 'No content'})
        }
    }
    else {
        res.status(400).json({ message: 'Invalid method ' })
    }
}