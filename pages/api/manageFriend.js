import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        const userId =  new ObjectId(data.userId.toString()) 
        const friendId =  new ObjectId(data.friendId.toString())  

        if (userId && friendId) {
            try {
                console.log(friendId)
                const { db } = await connectToDatabase();
                const addFriendResponse = await db.collection("users").updateOne({ _id: userId },{
                    $addToSet:{
                        "friends": friendId
                    }
                })
                if(!addFriendResponse.modifiedCount && addFriendResponse.matchedCount && addFriendResponse.acknowledged){
                    return res.status(200).json({message:'succesfull',type:'unfriend'})
                }
                return res.status(200).json({message:'successful',type:'addfriend'})
            }
            catch(e) {
                console.log(e)
                return res.status(404).json({message: 'Internal error'})
            }

        }
        else {
            return res.status(400).json({ message: 'Bad request' })
        }
  

    }
    return res.status(404).json({ message: 'Bad request' })
}


export default handler;