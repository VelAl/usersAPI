import jwt from 'jsonwebtoken'
import {secret} from '../config.js'


export const  proxyDeletionMiddleWare = (req, res, next, ) => {

    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodedData = jwt.verify(token, secret)

        const isDeletionProxy = req.params.id === decodedData.id

        isDeletionProxy ?

        next()
          :
        res.status(403).json('can delete only authorized user by himself...')

        
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "user is not authorized..."})
    }

}