//Gestionar un perfil existente de usuario
import User from './user.model.js'
import { checkPassword,encrypt } from '../../utils/encryp.js'
export const getUsuarios = async(req,res)=>{
    try{
        //Configuraciones de paginación
        const { limit = 20, skip = 0 } = req.query
        //Consultar
        const users = await User.find()
            .skip(skip)
            .limit(limit)
            
        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found:', 
                users
            }   
        )
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error', err})
    }
}

export const getUsuario = async(req,res)=>{
    try {
        let id = req.params.id
        let user = await User.findById(id)
        if(!user) return res.status(404).send({message:'The user does not exists or the id is wrong'})
        return res.send({message:'User found:',user})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'General error showing the User'})
    }
}
export const updateUsuario = async(req,res)=>{
    try {
        let { id } = req.params
        let data = req.body
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new:true}
        )
        if(!update) return res.status(404).send(
            {
                success:false,
                message:'User not found'
            }
        )
        return res.send({success:true,message:'User updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message: 'General error showing the User'})
    }
}
export const deleteUsuario = async(req,res)=>{
    try {
        let id = req.params.id
        let user = await User.findByIdAndDelete(id)
        if(!user) return res.status(404).send({message:'The user does not exists or the id is wrong'})
        return res.send({message:'User deleted: ',user})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'General error showing the User'})
    }
}

export const cambiarPassword =async(req,res)=>{
    try {
        let idUsuario = req.params.id
        let {newPassword,oldPassword}= req.body
        let user = await User.findById(idUsuario)
        if(user && await checkPassword(user.password,oldPassword)){
            user.password = await encrypt(newPassword)
            await user.save()
            return res.send({message:'Password changed succesfully'})
        }
        return res.status(404).send({message:'The user does not exists or the password is wrong'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'General error updating the password'})
    }
}
// Acutalizar profile picture