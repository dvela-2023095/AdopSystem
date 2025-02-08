import { validationResult } from "express-validator";

//Validar los errores del middleware
export const validateErrors = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(errors)
    }
    next()
}

export const validateErrorsWhitoutFiles = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).send({success:false, message:'Error whit validation',errors:errors})
    }
    next()
}
