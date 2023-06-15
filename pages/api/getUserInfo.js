//import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';
//import {  ObjectId } from 'mongodb';


export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)

        // location = address[{province},{district},{neighborhood}]

       

        if (data.userName) {
            const { db } = await connectToDatabase();
            //const userId = new ObjectId(data.userId.toString())
            const response = await db.collection('users').findOne({ userName: data.userName })
            console.log(response)
            const user = JSON.parse(JSON.stringify(response))

            if (response.posts) {
                //console.log(response._id)
                const posts = await db.collection('posts').find({ postedBy: response._id }).sort({_id: -1}).toArray();
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
                //console.log(filtered)
                res.status(200).json({ user: user, posts: filtered })
            }
            else {
                res.status(200).json({ user: user })
            }


        }
        else {
            res.status(400).json({ message: 'No content' })
        }
    }
    else {
        res.status(400).json({ message: 'Invalid method ' })
    }
}