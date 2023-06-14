import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        if (data) {
            const postedBy = new ObjectId(data.postedBy.toString())
            const newData = {
                        postedBy: postedBy,
                        date: data.date,
                        likes: data.likes,
                        location: data.location,
                        profilePic: data.profilePic,
                        text: data.text,
                        tags: data.tags,
                        comments: data.comments,
                        image: data.image,
                        userName: data.userName,
                        fullName: data.fullName

            }

            try {
                const { db } = await connectToDatabase();
                const insertResponse = await db.collection('posts').insertOne(newData, (err) => {
                    if (err) { console.log(err); return }
                })
                console.log(data.postedBy)
                const userId = new ObjectId(data.postedBy.toString())
                await db.collection('users').updateOne({ _id: userId },
                    {
                        $push: {
                            "posts": {
                                postId: insertResponse.insertedId
                            }
                        }
                    })
                console.log(insertResponse.insertedId)
                return res.status(200).json({ message: 'successful' })
            }
            catch {
                return res.status(404)
            }




        }
        return res.status(404).json({ message: 'error' })

    }
    return res.status(404).json({ message: 'Bad request' })
}


export default handler;