import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        const userId = new ObjectId(data.userId.toString())
        const friendId = new ObjectId(data.friendId.toString())

        if (userId && friendId) {

            try {
                console.log(friendId)
                const { db } = await connectToDatabase();
                const userFriends = await db.collection("users").find({ _id: userId }).project({ friends: 1 }).toArray()

                if (friendId in userFriends) {
                    return res.status(400)
                }
                await db.collection("users").updateOne({ _id: userId }, {
                    $addToSet: {
                        "tempFriends": friendId
                    }
                }).then((resp) => {
                    if (!resp.modifiedCount && resp.matchedCount && resp.acknowledged) {
                        
                        return res.status(200).json({ message: 'succesfull', type: 'unfriend' })
                    }
                    else {

                        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                            "July", "Aug", "Sept", "Oct", "Nov", "Dec"
                        ];
                        const current = new Date();
                        const date = `${current.getDate()} ${monthNames[current.getMonth()]}`;
                        try{
                            db.collection("users").updateOne({ _id: friendId }, {
                                $addToSet: {
                                    "notifications": {
                                        type: 'friend-request',
                                        date: date,
                                        senderId: userId
                                    }
                                }
                            })
                            return res.status(200).json({ message: 'succesfull', type: 'friend-request' })
                        }
                        catch{
                            return res.status(404).json({message:'Internal error'})
                        }
                    }
                })

            }
            catch (e) {
                console.log(e)
                return res.status(404).json({ message: 'Internal error' })
            }

        }
        else {
            return res.status(400).json({ message: 'Bad request' })
        }


    }
    else {
        return res.status(404).json({ message: 'Bad request' })
    }

}


export default handler;