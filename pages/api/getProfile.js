//import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';
import {  ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)

        // location = address[{province},{district},{neighborhood}]

       

        if (data.userId) {
            const { db } = await connectToDatabase();
            const userId = new ObjectId(data.userId.toString())
            const response = await db.collection('users').findOne({ _id: userId })
           
            const user = JSON.parse(JSON.stringify(response))
            let friends = []
            let friendsIds = []
       
            user.friends.forEach(element => {
                console.log(element)
                const ObjectFriendId = new ObjectId(element.toString())
                friendsIds.push(ObjectFriendId)
      
            });
  
           
            if(friendsIds.length>0){
       
                const users = await db.collection('users').find({_id: {$in: friendsIds}}).project({_id:1,firstName:1,lastName:1,profilePic:1,userName:1}).toArray()
                friends.push(users)
            }
        
         /*    user.friends?.map(async userId=>{
                console.log('zaxxer')
                await db.collection('users').findOne({_id: userId}).then((user)=>{
                    friends.push({firstName: user.firstName, lastName: user.lastName, profilePic: user.profilePic})
                })
            })
 */
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
                res.status(200).json({ user: user,friends: friends[0], posts: filtered })
            }
            else {
                res.status(200).json({ user: user,friends: friends[0]})
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