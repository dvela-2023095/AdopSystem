import { Router } from "express";
import { appointmentValidator,updateAppoValidator } from "../../middlewares/validators.js";
import { addAppo, deleteAppo, getAppo, getAppos, putAppo, testAppo } from "./appointment.controller.js";
import {validateJwt} from "../../middlewares/validate.jwt.js"
const api = Router()

api.get('/test',testAppo)
api.post('/add',validateJwt,[appointmentValidator],addAppo)
api.get('/',validateJwt, getAppos)
api.get('/get/:id',validateJwt,getAppo)
api.put('/put/:id',[validateJwt,updateAppoValidator],putAppo)
api.delete('/delete/:id',validateJwt,deleteAppo)
export default api