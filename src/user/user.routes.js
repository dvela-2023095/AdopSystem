import { Router } from 'express'
import { cambiarPassword, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { updateUserValidator } from '../../middlewares/validators.js'
const api = Router()

api.get('/',validateJwt,getUsuarios)
api.get('/get/:id',validateJwt,getUsuario)
api.put('/update/:id',[validateJwt,updateUserValidator],updateUsuario)
api.delete('/delete/:id',validateJwt, deleteUsuario)
api.put('/updatePassword/:id',validateJwt,cambiarPassword)
export default api