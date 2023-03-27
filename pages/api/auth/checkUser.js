import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {

        //Getting email and password from body
        const email = JSON.parse(req.body).email
        const password = JSON.parse(req.body).password
        //Validate
        
       /*  if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        } */
        //Connect with database
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();
        //Check existing
        const checkExisting = await db
            .collection('users')
            .findOne({ email: email });
        //Send error response if duplicate user is found
        console.log(email)
        if (checkExisting) {
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
        res.status(200).json({ message: 'User is unique'});
        //Close DB connection
        client.close(); 
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
