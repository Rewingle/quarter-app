//import { MongoClient} from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const data = JSON.parse(req.body)

        if (data.postId && data.commentsBetween) {

            if (data.commentsBetween == 1) {

                let joined = []

                const { db } = await connectToDatabase();

                const postId = new ObjectId(data.postId.toString())

                const comments = await db.collection('posts').find({ _id: postId }).project({ comments: 1 }).toArray()
                console.log(comments)
                if (comments.length < 6) {
                    await db.collection('posts').aggregate([{
                        $match: {
                            _id: postId
                        },
                    }, {
                        $project: {
                            hasMore: { $gt: [{ $size: "$comments" }, 5] },
                            comments: { $slice: ["$comments", 0, { $size: "$comments" }] },
                            _id: 0,

                        }
                    }]).forEach(async (post) => {

                        const comments = post.comments

                        for (const comment of comments) {

                            await db.collection('users').findOne({ _id: comment.userId }).then((user) => {

                                joined.push({ fullName: user.firstName + ' ' + user.lastName, text: comment.text, profilePic: user.profilePic, date: comment.date, userName: comment.userName })

                            }).catch((err) => res.status(404).json({ message: err }))
                        }
                        res.status(200).json({ comments: joined, hasMore: post.hasMore })


                    })
                }
                else {
                    await db.collection('posts').aggregate([{
                        $match: {
                            _id: postId
                        },
                    }, {
                        $project: {
                            hasMore: { $gt: [{ $size: "$comments" }, 5] },
                            comments: { $slice: ["$comments", { $subtract: [{ $size: "$comments" }, 5] }, { $size: "$comments" }] },
                            _id: 0,

                        }
                    }]).forEach(async (post) => {

                        const comments = post.comments

                        for (const comment of comments) {

                            await db.collection('users').findOne({ _id: comment.userId }).then((user) => {

                                joined.push({ fullName: user.firstName + ' ' + user.lastName, text: comment.text, profilePic: user.profilePic, date: comment.date, userName: comment.userName })

                            }).catch((err) => res.status(404).json({ message: err }))
                        }
                        res.status(200).json({ comments: joined, hasMore: post.hasMore })


                    })
                }
            }
            else {
                let joined = []
                const { db } = await connectToDatabase();

                const postId = new ObjectId(data.postId.toString())
                await db.collection('posts').aggregate([{
                    $match: {
                        _id: postId
                    }
                }, {
                    $project: {
                        hasMore: { $gt: [{ $size: "$comments" }, 5 * data.commentsBetween] },
                        comments: {
                            $slice: ["$comments",
                                {
                                    $cond:
                                    {
                                        if:
                                            { $lte: [{ $subtract: [{ $size: "$comments" }, 5 * data.commentsBetween] }, 0] },
                                        then: 0,
                                        else: { $subtract: [{ $size: "$comments" }, 5 * data.commentsBetween] }
                                    }
                                }, { $subtract: [{ $size: "$comments" }, 5 * (data.commentsBetween - 1)] }]
                        },
                        _id: 0
                    }
                }]).forEach(async (post) => {

                    const comments = post.comments

                    for (const comment of comments) {

                        await db.collection('users').findOne({ _id: comment.userId }).then((user) => {

                            joined.push({ fullName: user.firstName + ' ' + user.lastName, text: comment.text, profilePic: user.profilePic, date: comment.date, userName: comment.userName })

                        }).catch((err) => res.status(404).json({ message: err }))
                    }
                    //console.log(joined)
                    res.status(200).json({ comments: joined, hasMore: post.hasMore })


                })

            }

        }
        else {
            res.status(500).json({ message: 'bad request' })
        }

    }
    else {
        res.status(500).json({ message: 'bad request' })
    }
}