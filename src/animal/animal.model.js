//nombre/descripcion/edad/keeper/ObjectId de usuario solo de rolcliente
import { Schema, model } from "mongoose"

const animalSchema = Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required'],
            maxlength:[42,`Cant' overcome 42 characters`]
        },
        description:{
            type:String,
            required:[true,'Description is required']
        },
        age:{
            type:Number,
            required:[true,'Age is required']
        },
        type:{
            type:String,
            required:[true, 'Type is required']
        },
        keeper:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required:[true,'A keeper is required']
        }
    }
)

export default model('Animal', animalSchema)