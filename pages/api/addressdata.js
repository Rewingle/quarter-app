import { MongoClient } from 'mongodb';
//import { connectToDatabase } from '../../lib/mongo';
async function handler(req, res) {

    if (req.method === 'POST') {
        if (req.body) {
            const body = JSON.parse(req.body)
            //Connect with database
            const client = await MongoClient.connect(
                `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true }
            ); 
            const db = client.db()
            //const {db} = connectToDatabase();


            if (body.selected == 'provinces') {

                const data = await db.collection('Provinces').find({}).project({ SehirAdi: 1, _id: 0 }).toArray()
                res.json(data)
                client.close()
            }
            if (body.selected == 'districts' && body.province) {

                const data = await db.collection('Districts').find({ SehirAdi: body.province }).project({ IlceAdi: 1,ilceId:1 }).toArray()
                res.json(data)
                client.close()

            }
            if (body.selected == 'neighborhoods' && body.districtId) {

                const data = await db.collection('Neighborhoods').find({ ilceId: body.districtId }).project({ MahalleAdi: 1 }).toArray()
                res.json(data)
                client.close()

            }
            else {
                res.status(404)
                
            }
        }
        else {
            res.status(404)
        }
        //Check existing
        /* const checkExisting = await db
            .collection('mahalle')
            .findOne({ email: email }); */
        //Send error response if duplicate user is found
        /* if (checkExisting) {
            console.log(checkExisting)
            res.status(422).json({ message: 'User already exists' });
            client.close();
            return;
        }
        //Hash password
        const status = await db.collection('users').insertOne({
            email,
            password: await hash(password, 12),
        });
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
        //Close DB connection
        client.close();  */
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;
