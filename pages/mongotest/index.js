import React from 'react'

import { connectToDatabase } from '../../lib/mongo/index.js'
export default function index({properties}) {
    
 
    return (
      <div>
      {
        properties.map((i,data)=>
            <div>{data.name}</div>
        )
      }
      </div>
    )
  }
  
  export async function getServerSideProps(context){
      const { db } = await connectToDatabase();
      const data = await db.collection("listingsAndReviews").find({}).limit(10).toArray();
      //console.log(data)
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
        //console.log(filtered)
        return {
          props:{
              properties: filtered
          }
        }
  }