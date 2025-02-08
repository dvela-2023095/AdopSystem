import Appointment from "./appointment.model.js";
import User from "../user/user.model.js"
import Animal from "../animal/animal.model.js"
export const testAppo = (req,res)=>{
    console.log('test is running')
    res.send({message:'Test is running'})
}
export const addAppo = async(req,res)=>{
    try {
        let data = req.body
        let appo = await Appointment.findOne({date: data.date})
        appo = await Appointment.findOne({user:data.user,animal: data.animal})
        let user = await User.findById(data.user)
        let animal = await Animal.findById(data.animal)
        if(!appo && user && animal){
            
            let appointment = new Appointment(data)
            await appointment.save()
            return res.send({message:'Appointment succesfully saved'})
        }else if(appo){
            return res.send({message:'Theres is already an appointment for that day or the user already has an appointment whith that animal'})
        }else if(!user){
            return res.status(404).send({message:'User not found'})
        }
        return res.status(404).send({message:'Animal not found'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({messsage:'General Error adding the appointment', error})
    }
}

export const getAppos = async(req,res)=>{
    try {
        let appos = await Appointment.find()
        if(appos.length ===0) return res.status(404).send({message:'Theres is not any appointment'})
        return res.send({message:'Appointments found: ',appos})
    } catch (error) {
        console.error(error)
        return res.status(500).send({messsage:'General Error Showing the appointments',error})
    }
}

export const getAppo = async(req,res)=>{
    try {
        let idAppo = req.params.id
        let appo = await Appointment.findById(idAppo)
        if(!appo) return res.status(404).send({message: 'Appoinntment does not exists or the id is wrong'})
        return res.send({message:'Appointment found :',appo})
    } catch (error) {
        console.error(error)
        return res.status(500).send({messsage:'General Error Showing the appointments',error})
    }
}

export const putAppo = async(req,res)=>{
    try {
        let {id} = req.params
        let newAppo = req.body
        const oldAppo = await Appointment.findByIdAndUpdate(id,newAppo,{new:true})
        if(!oldAppo)return res.status(404).send({success:false,message:'Appointment not found'})
        return res.status(500).send({message:'Appointment succesfully updated'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({messsage:'General Error updating the appointment',error})
    }
}

export const deleteAppo = async(req,res)=>{
    try {
        let idAppo = req.params.id
        let appo = await Appointment.findByIdAndDelete(idAppo)
        if(!appo) return res.status(404).send({message:'Appointment not found'})
        return res.send({message:'Appoinment deleted succesfully',appo})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error deleting the appointment'})
    }
}