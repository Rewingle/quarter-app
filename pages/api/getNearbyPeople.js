//import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = JSON.parse(req.body)
     
        // location = address[{province},{district},{neighborhood}]

        if (data.address) {
            try {

                const { db } = await connectToDatabase();
                console.log(data.address)
                const dbres = await db.collection("users").find({ address: data.address }).project({ firstName: 1, lastName: 1,profilePic:1, userName: 1 }).limit(3).toArray();
                console.log(dbres)
                const users = JSON.parse(JSON.stringify(dbres));
                //console.log(users)
                //const filtered = users.map(()=>)
                res.send(users)
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