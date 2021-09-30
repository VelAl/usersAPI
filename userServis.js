import User from './user.js'
import Role from './role.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { secret } from './config.js'

const generateJWT =(id, roles)=> {
    const payload ={
        id,
        roles,
    }

    return jwt.sign(payload, secret, {expiresIn:"24H"})
}


class UserService {
    async create(user){
        if (user.name.length < 2 ) {
            throw new Error('name must be at least 2 characters long')
        }
        if (user.password.length < 5 ||  user.password.length > 10) {
            throw new Error('password must be from 5 to 10 characters long')
        }

        const hachPassword  = bcrypt.hashSync(user.password, 6);
        const userRole = await Role.findOne({value: "USER"})

        const newUser = await User.create({...user, password: hachPassword, roles: [userRole.value]} )
        return {
            "name": newUser.name,
            "email": newUser.email,
            "_id": newUser._id,
        }
    }

    async login(user){
        if(!user.name || !user.password) return 'name and password must be provided...'

        const userFromDB = await User.findOne({name: user.name})
        console.log(userFromDB);
        if(!userFromDB) return 'there is no such user...'

        const isValidPassword = bcrypt.compareSync(user.password, userFromDB.password)
        if(!isValidPassword) return 'the password is not valid'

        const token = generateJWT(userFromDB._id, userFromDB.roles)

        return {token}
    }


    async getAll(){
        const users = await User.find({},'name email _id')
        return users
    }

    async getOne(id){
        if (!id) {
            throw new Error('there is no id...')
        }
        const user = await User.findById(id)
        return user
    }


    async update(user){
        if(!user._id) {
            throw new Error('please specify user')
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, user)
        return updatedUser
    }

    async delete(id){

        const user = await User.findByIdAndDelete(id)
        return user
    }
}

export default new UserService()