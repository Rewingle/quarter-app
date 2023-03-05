import axios from 'axios';
import React from 'react';
import { connectToDatabase } from '../../../../lib/mongo/index.js'

async function getUsers() {
 
  const { db } = await connectToDatabase();
  const data = await db.collection("users").find({}).limit(10).toArray();
  const users = JSON.parse(JSON.stringify(data));
  console.log(users)
  const filtered = users.map(user => {
    const likes = JSON.parse(JSON.stringify(user.likes));
    return {
      _id: user._id,
      fullname: user.fullname,
      date: user.date,
      location: user.location,
      profilePic: user.profilePic,
      text: user.text,
      likes: user.likes,
    }
  });
  
  return filtered
}


export default async function page({ properties }) {
  let users = await getUsers();
  return (
    <div>
      {users.map((obj) => {
        return <div key={obj._id}>{obj.fullname}{obj.text}</div>
      })}
    </div>
  )
}

/*  export async function getStaticProps(context){
    const { db } = await connectToDatabase();
    const data = await db.collection("listingsAndReviews").find({}).limit(10).toArray();
    console.log(data)
    const properties = JSON.parse(JSON.stringify(data));

    const filtered = properties.map(property => {
        const price = JSON.parse(JSON.stringify(property.price));
        return {
          _id: property._id,
          name: property.name,
          image: property.images.picture_url,
          address: property.address,
          summary: property.summary,
          guests: property.accommodates,
          price: price.$numberDecimal,
        }
      });
      console.log(filtered)
      return {
        props:{
            properties: filtered
        }
      }
}
  */
/*  async function getData(){
  //const res = await fetch('https://jsonplaceholder.typicode.com/users');
  await axios.get('https://jsonplaceholder.typicode.com/users').then((res))
  console.log(res.data)
  return res.data
}  */