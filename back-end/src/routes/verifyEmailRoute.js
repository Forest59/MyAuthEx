import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
//import { ObjectID } from "bson";

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body;
        const db = getDbConnection('react-auth-db');
        const result = await db.collection('users').findOne({
            verificationString,

        });

        if (!result) return res.status(401).json({ message: 'The email verification code is incorrect'});

        const { _id: id, email, info} = result;

        const result2 = await db.collection('users').updateOne({ _id: ObjectId(id)},{
            $set: { isVerified: true }
        });
        //console.log("test2:");
        //console.log(result2);

        if (result2.modifiedCount>0){
            jwt.sign({ id, email, isVerified: true, info}, process.env.JWT_SECRET, {expiresIn: '2d'}, (err, token) =>{
                if (err) return res.status(500).send(err);
                //console.log("jwt:");
                //console.log(token);
                return res.status(200).json({ token });
    
            });
        }
        else {
            return res.status(401).json({ message: 'The email verification code failed'});
        }

        
    }
}