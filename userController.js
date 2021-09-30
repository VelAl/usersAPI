
import userService from './userServis.js'



class UserController {
    async registration(req, res){
        try {
            const user = await userService.create(req.body)
            res.json(user)
    
        } catch (e) {
            if (e.message.includes("duplicate key")) {
                res.status(500).json('пользователь с таким именем уже существует')
            } else {
                res.status(500).json(e.message)
            }    
        }         
    }

    async login(req, res){
        
        
        try {
            const data = await userService.login(req.body)

            if(typeof(data)==='string') {
                res.status(400).json(data)
            } else res.json(data)
                
        } catch (e) {
            res.status(500).json(e.message)
        }         
    }

    async getUsers(req, res){
        try {
            const users = await userService.getAll()
            return res.json(users)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res){
        try {
            const user = await userService.getOne(req.params.id)
            return res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res){
        try {
            const updatedUser = await userService.update(req.body)
            return res.json(updatedUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res){
        try {
            const user = await userService.delete(req.params.id)
            return res.json({deleted:user})
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new UserController()