import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        const data = JSON.parse(req.body)

        //Getting email and password from body
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


        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();

        const isFullNameExist = await db.collection('users').findOne({ firstName: data.firstName, lastName: data.lastName })

        if (isFullNameExist) {
            var userName = null
            var i = 1
            while (1) {
                console.log('first')
                userName = (data.firstName.replace(/\s/g, '') + data.lastName.replace(/\s/g, '') + i.toString()).toLowerCase()
                const isUserNameExist = await db.collection('users').findOne({ userName: userName })
                if (!isUserNameExist) {
                    break
                }
                i++
            }
            const user = await db.collection('users').insertOne(
                {
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    userNAme: userName,
                    address: {
                        province: data.address.province,
                        district: data.address.district,
                        neighborhood: data.address.neighborhood
                    }


                }
            )
        }
        
        //Send error response if duplicate user is found




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
        res.status(200).json({ message: 'Register successful' });
        //Close DB connection
        client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
