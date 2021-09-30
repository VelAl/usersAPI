import Router from 'express'
import userController from './userController.js'
import {authMiddleware} from './middlware/authMiddleware.js'
import { proxyDeletionMiddleWare } from './middlware/proxyDeletionMW.js'



const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/users',authMiddleware, userController.getUsers)
router.get('/users/:id',authMiddleware, userController.getOne)
router.put('/users', userController.update)
router.delete('/users/:id',[authMiddleware, proxyDeletionMiddleWare], userController.delete)

export default router 