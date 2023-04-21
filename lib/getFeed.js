import { MongoClient } from 'mongodb';

export async function getFeed() {
    console.log('GETTT FEED CEHGECK')
/*     const { db } = await connectToDatabase();
    const data = await db.collection("posts").find({}).limit(10).sort({_id:-1}).toArray();
    const posts = JSON.parse(JSON.stringify(data));
 */
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = client.db();
    const data = await db.collection("posts").find({}).limit(10).sort({_id:-1}).toArray();
    const posts = JSON.parse(JSON.stringify(data));
    console.log(posts)
    const filtered = posts.map(post => {
       
        const likes = JSON.parse(JSON.stringify(post.likes));
        return {
            _id: post._id,
            fullName: post.fullName,
            userName: post.userName,
            date: post.date,
            location: post.location,
            profilePic: post.profilePic,
            comments: post.comments,
            text: post.text,
            tags: post.tags,
            likes: post.likes,
        }
    });
    
    return filtered
} 