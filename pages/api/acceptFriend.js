//import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)

        if (data.userId && data.friendId) {
            const userId = new ObjectId(data.userId.toString())
            const friendId = new ObjectId(data.friendId.toString())
            console.log(friendId)
            try {
                const { db } = await connectToDatabase()

                await db.collection('users').updateMany({ _id: userId }, [
                   { $addToSet: {
                        "friends": 
                            friendId
                        
                    }},{$pull:{
                        notifications: {senderId: friendId}
                    }}
                ])
                await db.collection('users').updateOne({ _id: friendId }, {
                    $addToSet: {
                        "friends": 
                            userId
                        
                    }
                })
                return res.status(200)
            }
            catch(err){
                return res.status(400).json({message:err})
            }
         

        }
        else {
            return res.status(400).json({ message: 'No content' })
        }

    }
    else {
        return res.status(400).json({ message: 'Bad request ' })
    }
}