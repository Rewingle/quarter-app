//import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)

        if (data.userId) {
            const userId = new ObjectId(data.userId.toString())

            try {
                const { db } = await connectToDatabase();
                await db.collection('users').findOne({ _id: userId }).then((user) => {
                    let processedNotifications = []
                    let count = 1
                    console.log(user.notifications)
                    user.notifications.forEach(async (notification) => {
                        console.log(user.notifications.length)
                        if (count == user.notifications.length) {
                            if (notification.type == 'friend-request') {
                                try {
                                    const senderId = new ObjectId(notification.senderId.toString())
                                    await db.collection('users').findOne({ _id: senderId }).then((user) => {
                                        console.log(user.firstName)
                                        processedNotifications.push(
                                            {
                                                type: notification.type,
                                                date: notification.date,
                                                senderInfo: { _id: user._id, userName: user.userName, firstName: user.firstName, lastName: user.lastName, profilePic: user.profilePic }
                                            })
                                    })

                                }
                                catch (err) {
                                    console.log(err)
                                }
                            }
                            return res.status(200).json({ notifications: processedNotifications })
                        }
                        if (notification.type == 'friend-request') {
                            try {
                                const senderId = new ObjectId(notification.senderId.toString())
                                await db.collection('users').findOne({ _id: senderId }).then((user) => {
                                    console.log(user.firstName)
                                    processedNotifications.push(
                                        {
                                            type: notification.type,
                                            date: notification.date,
                                            senderInfo: { _id: user._id, userName: user.userName, firstName: user.firstName, lastName: user.lastName, profilePic: user.profilePic }
                                        })
                                })

                            }
                            catch (err) {
                                console.log(err)
                            }
                        }
                        count = count + 1
                    })

                })
            }
            catch (err) {
                return res.status(400).json({ message: err })
            }

        }
        else {
            return res.status(400).json({ message: 'No content' })
        }

    }
    else {
        return res.status(400).json({ message: 'Bad request ' })
    }
}