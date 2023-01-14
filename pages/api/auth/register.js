import {db} from '../db'
import mysql from 'mysql2/promise'

export default async(req, res)=> {
    if(req == 'GET'){
        let data = await executeQuery("select * from users",[])
        res.send(data)
    }
    if (req == 'POST') {
        res.send({message:"asdasdasd"})
        try {
            const registerEmail = req.body.email
            const registerPassword = req.body.password
            var sql = "INSERT INTO users (email, password) VALUES ('"+registerEmail+"','"+registerPassword+"')"
            db.query(sql,function(error,result){
                if(error){
                    return res.send({
                        status:'fail',
                        message: error,
                    })
                }
                else{
                    return res.send({
                        status:'success',
                        message: 'succesfully registered'
                    })
                }
            })
           
            res.send(result)
        }
        catch(err){
            console.log(err)
        }
    }
    
}
