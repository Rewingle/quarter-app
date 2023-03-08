import { connectToDatabase } from "./mongo";
export async function getFeed() {

    const { db } = await connectToDatabase();
    const data = await db.collection("users").find({}).limit(10).toArray();
    const users = JSON.parse(JSON.stringify(data));
    const filtered = users.map(user => {
        const likes = JSON.parse(JSON.stringify(user.likes));
        return {
            _id: user._id,
            fullname: user.fullname,
            date: user.date,
            location: user.location,
            profilePic: user.profilePic,
            text: user.text,
            likes: user.likes,
        }
    });

    return filtered
} 