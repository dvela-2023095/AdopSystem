import { Router } from 'express'
import {login, register,test} from './auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { registerValidator } from '../../middlewares/validators.js'
import { uploadProfilePicture } from '../../middlewares/multer.upload.js'
import {deleteFileOnError} from '../../middlewares/delete.file.on.errors.js'
const api=Router()
//Rutas publicas
//api.get('/test',test)
api.post('/register',[uploadProfilePicture.single("profilePicture"),registerValidator, deleteFileOnError],register)
api.post('/login',login)
//Rutas privadas
api.get('/test', validateJwt, test)
//Exportar las rutas
export default api