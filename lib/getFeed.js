import { connectToDatabase } from "./mongo";
export async function getFeed() {
    console.log('GETTT FEED CEHGECK')
    const { db } = await connectToDatabase();
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