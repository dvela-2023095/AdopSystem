//Modelo para citas

import {Schema, model} from "mongoose"

const appointmentSchema = Schema(
    {
        date:{
            type:Date,
            required:[true, 'Date is required'],
            maxlength:[10, 'Cant overcome 10 characters'],
            unique:[true, 'There is already an appointment for that day']
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required:[true, 'A User is required']
        },
        animal:{
            type: Schema.Types.ObjectId,
            ref:'Animal',
            required:[true,'A Animal is required']
        }

    }
)

export default model('Appointment',appointmentSchema)