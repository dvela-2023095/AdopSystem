import { Router } from 'express'
import { addAnimal, deleteAnimal, getAnimal, getAnimals, testAnimal, updateAnimal } from './animal.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
const api=Router()
//Rutas publicas
api.get('/test',validateJwt,testAnimal)
api.post('/add',validateJwt,addAnimal)
api.get('/',validateJwt,getAnimals)
api.get('/get/:id',validateJwt,getAnimal)
api.put('/update/:id',validateJwt,updateAnimal)
api.delete('/delete/:id',validateJwt,deleteAnimal)
//Exportar rutas
export default api