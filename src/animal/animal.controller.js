import Animal from '../animal/animal.model.js'
import User from '../user/user.model.js'
 //Funcion de testeo
 export const testAnimal =(req,res)=>{
    console.log('Test animal is running')
    res.send({message:'Test animal is runnning'})
 }

 export const addAnimal=async(req,res)=>{
    try {
        let data = req.body
        let  idKeeper  = data.keeper
        let animal = new Animal(data)
        let keeper = await User.findById(idKeeper)
        if(!keeper) return res.status(404).send({message:'Keeper does not exist'})
        await animal.save()
        return res.send({message: 'Animal registered'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error whit Animal registration',error})
    }
 }
 export const getAnimals=async(req,res)=>{
    try {
        let animals = await Animal.find()
        if(animals.length ===0) return res.status(400).send({message: 'There is no animal in the data base'})
        return res.send({message: 'Animals found : ',animals})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error showing the Animals',error})
    }
 }
 export const getAnimal=async(req,res)=>{
    try {
        let id = req.params.id
        let mascota = await Animal.findById(id)
        if(!mascota) return res.status(404).send({message: 'Animal does not exits or the id is wrong'})
        return res.send({message: 'Animal found:',mascota})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error finding the animal',error})
    }
 }
 export const updateAnimal = async(req,res)=>{
    try {
        let data = req.body
        let id = req.params.id
        let oldMascota = await Animal.findById(id)
        if(!oldMascota) return res.status(404).send({message: 'Animal does not exits or the id is wrong'})
        let idKeeper = data.keeper
        if(!idKeeper) idKeeper = oldMascota.keeper
        let keeper = await User.findById(idKeeper)
        if(!keeper) return res.status(404).send({message:'Keeper does not exist'})
        Object.assign(oldMascota,data)
        await oldMascota.save()
        return res.send({message:'Animall successfully updated'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error updating the animal',error})
    }
 }
 export const deleteAnimal = async(req,res)=>{
    try {
        let id  = req.params.id
        let animal = await Animal.findByIdAndDelete(id)
        if(!animal) return res.status(404).send({message:'Animal does not exits or the id is wrong'})
        return res.send({message: 'Animal succesfully deleted', animal})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'General error deleting the animal',error})
    }
 }
