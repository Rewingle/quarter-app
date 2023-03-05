import axios from "axios"
export default async function handler( req,res){
    
     await axios.get('https://pokeapi.co/api/v2/pokemon/').then((response)=>{
        res.status(200).json(response.results)
    }
    ).catch((err)=>{
        res.status(404).json({error: err.message})
        console.log('first')
    }
      
    ) 
}