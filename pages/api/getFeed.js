//import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)

         // location = address[{province},{district},{neighborhood}]
       
        if (data.location && data.userId) {
            try {

                const { db } = await connectToDatabase();

                const dbres = await db.collection("posts").find({ location: data.location }).limit(10).sort({ _id: -1 }).toArray();
                const posts = JSON.parse(JSON.stringify(dbres));
                const userId = new ObjectId(data.userId.toString())
            
                const filtered = posts.map(post => {
                    
                    return {
                        _id: post._id,
                        fullName: post.fullName,
                        userName: post.userName,
                        date: post.date,
                        location: post.location,
                        profilePic: post.profilePic,
                        commentsCount: post.comments.length,
                        text: post.text,
                        tags: post.tags,
                        likes: post.likes.length,
                        isLiked: post.likes.includes(data.userId.toString())
                    }
                });

                res.send(filtered)
                //client.close()
            }
            catch (e) {

                console.log(e)
                res.status(404).json({ error: e })
            }
        }

    }
    else {
        res.status(400).json({ message: 'No content ' })
    }
}