import { MongoClient } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongo';
async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {

        //Getting email and password from body
        const email = JSON.parse(req.body).email
        //Validate
        
       
        //Connect with database
      /*   const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db(); */

        const {db} = await connectToDatabase();

        //Check existing
        const checkExisting = await db
            .collection('users')
            .findOne({ email: email });
        //Send error response if duplicate user is found
        console.log(email)
        if (checkExisting) {
            console.log(checkExisting)
            const userId = JSON.stringify(checkExisting._id).split("'")[0].split('"')[1]
            res.status(422).json({ message: 'User already exists',userId: userId});
            client.close();
            return;
        }
        //Hash password
        /* const status = await db.collection('users').insertOne({
            email,
            password: await hash(password, 12),
        }); */
        //Send success response
        console.log(checkExisting)
        res.status(200).json({ message: 'User is unique'});
        //Close DB connection
        client.close(); 
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
