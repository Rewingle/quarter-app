//import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './mongo';

export default async function sendNotification(receiverId, payload) {

    try{

        const {db} = connectToDatabase()

        await db.collection('users').updateOne({_id: receiverId},{
            $addToSet:{
                "notifications": payload
            }
        })
        return
    }
    catch(e){
        return e
    }


}