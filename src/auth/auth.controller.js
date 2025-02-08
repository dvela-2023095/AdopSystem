//Gestionar logica de autenticacion
import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'
//Funcion de testeo
export const test =(rep,res)=>{
    console.log('Test in running')
    res.send({message:'Test is running'})
}

//Register-User
export const register =async(req,res)=>{
    try {
        let data =req.body

        let user=new User(data)
        //Encriptar la password
        user.password = await encrypt(user.password)
        user.role = 'CLIENT'
        //asignar profile picture
        user.profilePicture = req.file.filename ?? null//Nullish si es verdad lo de la izquierda , pone ese valor si no pone el de la derecha
        await user.save()

        return res.send({message: 'Registered de user'})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error whit user registration',error})
    }
}
//Login
export const login = async(req,res)=>{
    try {
        //Capturar los datos(body)
        let { username,password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({username}) // {username} = {username:username}
        //verificar que la contrasenia coincida
        if(user && await checkPassword(user.password, password)){
            let loggedUser={
                auid: user._id,
                username: user.username,
                name:user.name,
                role:user.role
            }
            let token =await generateJwt(loggedUser)
            return res.send({message: `Welcome ${user.name}`, loggedUser, token})
        }
        //Responder al usuario
        return res.status(400).send({message:'Invalid Credentials'})
            //Mas adelante: Generar el token
        //Responder al usuario
    } catch (error) {
        console.error(error)
        return res.status(500).send({messsage:'General error whith login function',error})
    }
}