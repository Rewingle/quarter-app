//import { MongoClient} from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        if (data.postId) {
            let joined = []
            const { db } = await connectToDatabase();

            const postId = new ObjectId(data.postId.toString())
            await db.collection('posts').find({ _id: postId }).sort({ _id: -1 }).project({ comments: 1, _id: 0 }).forEach(async(post) => {
                const comments = post.comments

                for (const comment of comments){
                 
                    await db.collection('users').findOne({ _id: comment.userId }).then((user) => {
                        
                        joined.push({ fullName: user.firstName + ' ' + user.lastName, text: comment.text, profilePic: user.profilePic, date: comment.date, userName: comment.userName })
                    
                    }).catch((err)=>res.status(404).json({message:err}))
                }
                res.status(200).json(joined)
     

            }) 
    

        }
        else {
            res.staus(500).json({ message: 'bad request' })
        }

    }
    else {
        res.staus(500).json({ message: 'bad request' })
    }
}