//Validar datos relacionados a la BD

import User from '../src/user/user.model.js'
import Appo from '../src/appointment/appointment.model.js'
export const existUsername = async(username, user)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername &&alreadyUsername._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}
export const existAppo =async(date)=>{
    const alreadyDate = await Appo.findOne({date})
    if(alreadyDate){
        console.error(`There is an appointment for that day`)
        throw new Error(`There is an appointment for that day`)
    }
}

export const existEmail = async(email,user)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const notRequiredFile = (field)=>{
    if(field){
        throw new Error(`Password is not required`)
    }
}