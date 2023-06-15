//import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '../../lib/mongo';
async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        const data = JSON.parse(req.body)
        function convertString(phrase) {
            var maxLength = 100;

            var returnString = phrase.toLowerCase();
            //Convert Characters
            returnString = returnString.replace(/ö/g, 'o');
            returnString = returnString.replace(/ç/g, 'c');
            returnString = returnString.replace(/ş/g, 's');
            returnString = returnString.replace(/ı/g, 'i');
            returnString = returnString.replace(/ğ/g, 'g');
            returnString = returnString.replace(/ü/g, 'u');

            // if there are other invalid chars, convert them into blank spaces
            returnString = returnString.replace(/[^a-z0-9\s-]/g, "");
            // convert multiple spaces and hyphens into one space       
            returnString = returnString.replace(/[\s-]+/g, " ");
            // trims current string
            returnString = returnString.replace(/^\s+|\s+$/g, "");
            // cuts string (if too long)
            if (returnString.length > maxLength)
                returnString = returnString.substring(0, maxLength);
            // add hyphens
            returnString = returnString.replace(/\s/g, "-");

            return (returnString);
        }


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

        const { db } = await connectToDatabase();

        const isFullNameExist = await db.collection('users').findOne({ firstName: data.firstName, lastName: data.lastName })

        if (isFullNameExist) {
            var uniqueUsername = null
            var i = 1
            while (1) {
                console.log('found user with this first and last name')
                uniqueUsername = convertString((data.firstName.replace(/\s/g, '') + data.lastName.replace(/\s/g, '') + i.toString()).toLowerCase())

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
                    },
                    likedPosts: [],
                    friends: [],
                    tempFriends: [],
                    notifications: []

                }
            )
            res.status(200).json({ message: 'Register successful' });
            //client.close()
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
                },
                likedPosts: [],
                friends: [],
                tempFriends: [],
                notifications: []


            }
        )

        console.log(user)


        res.status(200).json({ message: 'Register successful' });
        //Close DB connection
        //client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
