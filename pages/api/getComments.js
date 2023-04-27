//import { MongoClient} from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        if (data.postId) {
       
            const {db} = await connectToDatabase();


            const postId = new ObjectId(data.postId.toString())
            const response = await db.collection('posts').find({ _id: postId }).project({ comments: 1, _id: 0 }).toArray()
            const comments = response[0].comments
            console.log(comments)

            const commentCount = comments.length

            let joined = []


            try {
                var processedComments = 0
                comments.forEach(async (comment) => {
                  

                    const user = await db.collection('users').findOne({ _id: comment.userId })
                    joined.push({ fullName: user.firstName + ' ' + user.lastName, text: comment.text, profilePic: user.profilePic, date: comment.date, userName: comment.userName })
                    processedComments++
                    if(commentCount == processedComments){
                        console.log(joined)
                        res.status(200).json(joined)
                 
                    }
                })
            } catch (err) { console.log('errror'); res.status(400).json({message:'error'}) }


        }
        else {
            res.staus(500).json({ message: 'bad request' })
        }

    }
    else {
        res.staus(500).json({ message: 'bad request' })
    }
}