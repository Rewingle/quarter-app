import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)

        const location = data.location; // location = address[{province},{district},{neighborhood}]
        const userId = data.userId;
        console.log('ZAXONAAAAAAAA')
        if (location && userId) {
            try {
                console.log('debee')
                const client = await MongoClient.connect(
                    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                );
                const db = client.db();

                const data = await db.collection("posts").find({}).limit(10).sort({ _id: -1 }).toArray();
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
                
                res.send(filtered)
                client.close()
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