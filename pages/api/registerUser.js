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
        const firstName = data.firstName
        const userName = (firstName.replace(/\s/g, '') + data.lastName.replace(/\s/g, '')).toLowerCase()
        const character = firstName.substring(0, 1).toUpperCase()

        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();

        const isFullNameExist = await db.collection('users').findOne({ firstName: data.firstName, lastName: data.lastName })

        if (isFullNameExist) {
            var uniqueUsername = null
            var i = 1
            while (1) {
                console.log('found user with this first and last name')
                uniqueUsername = (data.firstName.replace(/\s/g, '') + data.lastName.replace(/\s/g, '') + i.toString()).toLowerCase()
                const isUserNameExist = await db.collection('users').findOne({ userName: uniqueUsername })
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
                    userName: uniqueUsername,
                    profilePic: data.profilePic ? data.profilePic : character,
                    address: {
                        province: data.address.province,
                        district: data.address.district,
                        neighborhood: data.address.neighborhood
                    }


                }
            )
            res.status(200).json({ message: 'Register successful' });
            client.close()
        }

        const user = await db.collection('users').insertOne(
            {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                userName: userName,
                profilePic: data.profilePic ? data.profilePic : character,
                address: {
                    province: data.address.province,
                    district: data.address.district,
                    neighborhood: data.address.neighborhood
                }


            }
        )

        console.log(user)


        res.status(200).json({ message: 'Register successful' });
        //Close DB connection
        client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
