//import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)
        
        // location = address[{province},{district},{neighborhood}]

        if (data.address && data.userId) {
            const userId = new ObjectId(data.userId.toString())
            try {
               

                const { db } = await connectToDatabase();
                const dbres = await db.collection("users").find( {$and:[{address: data.address},{_id: {$ne: userId}}]}).project({ _id:1,firstName: 1, lastName: 1,profilePic:1, userName: 1,friends:1 }).limit(3).toArray();
    
                const users = JSON.parse(JSON.stringify(dbres));
                let usersWithFriendships = []

                users.forEach((user)=>{
                    console.log(user.friends)
                    if(user.friends.includes(data.userId)){
                        
                        usersWithFriendships.push({user,isFriend:true})
                    }
                    else{
                        usersWithFriendships.push({user,isFriend:false})
                    }
                }) 
                //console.log(users)
                //const filtered = users.map(()=>)
                console.log(usersWithFriendships)
                res.send(usersWithFriendships)
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