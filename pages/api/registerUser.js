import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        //Getting email and password from body
        const email = data.email
        const password = data.password
        const firstName = data.firstName
        const lastName = data.lastName
        const profilePic = data.profilePic
        const province = data.address.province
        const district = data.address.district
        const neighborhood = data.address.neighborhood
        console.log(data)
        //Validate
        
        //EXPECTED DATA
        /* 
        
            {
                email:
                password:
                firstName:
                lastName:
                profilePic:
                address: {
                    province:
                    district:
                    neighborhood:
                }

            }
        
        */
       //console.log(neighborhood,district,province,profilePic,lastName,password,email)
        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();
        
        //Send error response if duplicate user is found
        try{
            const user = await db.collection('users').insertOne(data)
        }
        catch{
            res.status(400).json({message: 'Invalid request'})
        }
        
       /*  if (checkExisting) {
            const userId = JSON.stringify(checkExisting._id).split("'")[0].split('"')[1]
            res.status(422).json({ message: 'User already exists',userId: userId});
            client.close();
            return;
        } */
        //Hash password
        /* const status = await db.collection('users').insertOne({
            email,
            password: await hash(password, 12),
        }); */
        //Send success response
        res.status(200).json({ message: 'Register successful'});
        //Close DB connection
        client.close(); 
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
