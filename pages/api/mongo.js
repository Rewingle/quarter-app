//import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  /*   const MONGODB_DB = process.env.MONGODB_DB
   try {
       const client = await clientPromise;
       const db = client.db(MONGODB_DB);

       const data = await db.collection("listingsAndReviews").find({}).limit(10).toArray();
       res.json(data);
   } catch (e) {
       console.error(e);
   } */
   await res.status(200).json({'name':'mali'})
};