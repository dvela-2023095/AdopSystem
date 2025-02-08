//Validar campos en las rutas
import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import { existAppo, existEmail, existUsername, notRequiredFile } from "../utils/db.validators.js";

//Arreglo de validacion (por cada ruta)
export const registerValidator = [
    body('name','Name cannot be empty').notEmpty(),
    body('surname','Surname cannot be empty').notEmpty(),
    body('email','Email cannot be empty').notEmpty().isEmail(),//Express validator tiene su propio regex
    body('username','Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password','Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be Strong').isLength({min:8}),
    body('phone','Phone cannot be empty').notEmpty().isMobilePhone().withMessage('Phone number invalid'),
    validateErrors
]

export const appointmentValidator=[
    body('date','Date cannot be empty').notEmpty().isDate().withMessage('Invalid Date format').isLength({max:10}).withMessage('Cannot overcome 8 characters'),
    body('user','User cannot be empty').notEmpty().isMongoId().withMessage('Invalid User id'),
    body('animal','Animal cannot be empty').notEmpty().isMongoId().withMessage('Invalid Animal id')
]

export const updateUserValidator =[
    body('username').optional().notEmpty().toLowerCase().custom((username, {req})=> existUsername(username,req.user)),
    body('email').optional().notEmpty().isEmail().custom((email, {req})=> existEmail(email,req.user)),
    body('password').optional().notEmpty().custom(notRequiredFile),
    body('profilePicture').optional().notEmpty().custom(notRequiredFile),
    body('role').optional().notEmpty().custom(notRequiredFile),
    validateErrors //Despues se modifica
]

export const updateAppoValidator=[
    body('date','Date cannot be empty').optional().notEmpty().custom(existAppo),
    body('user','User cannot be empty').optional().notEmpty(),
    body('animal','Animal cannot be empty').optional().notEmpty(),
    validateErrors
]