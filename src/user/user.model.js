//Modelo de usuario

import { Schema, model } from "mongoose";

const userSchema = Schema(
    {
        name:{
            type: String,
            //Mongo validations (middleware| Intermediario que valida el parametro antes de guardar)
            required: [true, 'Name is required'],
            maxlength:[25,'Cant overcome 25 characters']
        },
        surname:{
            type:String,
            required: [true, 'Surname is required'],
            maxlength:[25,'Cant overcome 25 characters']
        },
        username:{
            type: String,
            required: [true, 'Surname is required'],
            unique:[true,'Username is already taken'],//No se puede duplicar el valor
            lowercase:true,
            maxlength:[15, `Cant overcome 15 characters`]
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            //Vamos a ver que pasa si no es unico
            //Validacion personalizada
            //match:[/* Regex Para validar Email */ /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/]
        },
        password:{
            type: String,
            require: [true, 'Surname is required'],
            minLength:[8, 'PAssword mus be 8 characters'],
            maxlength:[100, `Can't be overcome 16 characters`],
            //match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/]
        },
        profilePicture:{
            type:String
        },
        phone:{
            type: String,
            required:[true,'Phone is required'],
            minLength:[8,`Can't be overcome 8 characters`],
            maxlength:[15, `Can't be overcome 15 characters`],
            //match:[/^\+[0-9]{1,3} [0-9]{3,5}-[0-9]{4}$/]
        },
        role:{
            type:String,
            required:[true,'Role is required'],
            uppercase:true,
            enum:['ADMIN','CLIENT']
        }
    }
)

//Modificar el toJSON -> toObject para excluir datos en la respuesta
userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject() //Sirve para convertir un documento de MongoDB a Objeto de JS
    return user
}
//Crear y Exportar el modelo

export default model('User', userSchema)
