//import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)
        // location = address[{province},{district},{neighborhood}]

        if (data.location && data.userId && data.postsBetween) {
            try {

                const { db } = await connectToDatabase();

                const dbres = await db.collection("posts").find({ location: data.location }).sort({ _id: -1 }).toArray();
                /*  await db.collection('posts').aggregate([{
                     $match: {
                         location: data.location
                     }
                 }, {
                     $project: {
 
                     }
                 },{
                     $sort:{_id:-1}
                 }]) */
                //console.log(dbres)
       
                let hasMore = true
                if (data.postsBetween.from >= dbres.length ) {
                    hasMore = false
                }
                //console.log(dbres.slice(data.postsBetween.from, data.postsBetween.to))
                let postsBetween = {from: data.postsBetween.from, to: data.postsBetween.to}
                if(postsBetween.from > 0){
                    postsBetween.from = postsBetween.from + 1;
                    postsBetween.to = postsBetween.to + 1;
                }
                const posts = JSON.parse(JSON.stringify(dbres.slice(postsBetween.from, postsBetween.to)));
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
                        image: post.image,
                        likes: post.likes.length,
                        isLiked: post.likes.includes(data.userId.toString())
                    }
                });

                res.send({ hasMore: hasMore, posts: filtered })
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