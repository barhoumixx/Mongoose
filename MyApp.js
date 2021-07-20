const mongoose = require('mongoose');
require('dotenv').config();
//mongooss connection offfffffffffffff
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connected to mongodb...'))
.catch(err => console.error('could not connect to mongodb ...',err));


//create schema
const Schema = mongoose.Schema;
const personSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        required: true
    },
    favoriteFoods:{
        type:[String],  
    } 
});
//lod shema
const Person = mongoose.model('Person', personSchema);

//Create and Save a Record of a Model

async function createPerson(){
  const person = new Person({
    name: "marry",
    age: 24,
    favoriteFoods: ["fruit"]
});
const result = await person.save();
console.log(result)
}
//createPerson()

//Create Many Records with model.create()
async function createManyPerson(){

const  arrayOfPeople = [
    {name: "max", age: 28, favoriteFoods: ["chicken","pasta"]},
    {name: "jack", age: 20, favoriteFoods: ["mel","fruit"]},
    {name:"cody", age: 9, favoriteFoods: ["dark choklat"]}
  ];
try {
    const person = await Person.create(arrayOfPeople)
} catch (err) {
    console.log(err)
}

}
//createManyPerson()


//Use model.find() to Search Your Database
async function findPersonByName(){
    const person = await Person.find({name:'wassim'});
    console.log(person);
}
//findPersonByName()

//Use model.findOne() to Return a Single Matching Document from Your Database
async function findOneByFood(){
    const person = await Person.findOne({favoriteFoods: 'fruit'});
    console.log(person);
}
//findOneByFood();

//Use model.findById() to Search Your Database By _id
async function findPersonById(){
    const person = await Person.findById({_id: '60ce1f58465a651f5818c9ec'});
    console.log(person);
}
//findPersonById()
//Perform Classic Updates by Running Find, Edit, then Save
async function findEditThenSave(){
    const person = await Person.findById({
        _id: '60ce1f58465a651f5818c9ec'
        })

    person.set({
        favoriteFoods: "hamburger"
    })
    //Person.favoriteFoods.push("hamburger");
    const result = await person.save();
    console.log(result)

      
      
}
//findEditThenSave();

//Perform New Updates on a Document Using model.findOneAndUpdate()


async function findAndUpdate(){
    const person = await Person.findOneAndUpdate({name:'sohir'},{age:20})

    console.log(person);
}

//findAndUpdate();

//Delete One Document Using model.findByIdAndRemove
async function removeById(_id){
    const person = await Person.findByIdAndRemove({_id})
    console.log(person);

}
//removeById('60ce1f58465a651f5818c9e9');

//Delete Many Documents with model.remove()
async function removeManyPerson(){
const person = await Person.remove({name: 'Marry'})
console.log(person);

}
//removeManyPerson();
//Chain Search Query Helpers to Narrow Search Results
async function queryChain(){

    const person = await Person
    .find({favoriteFoods: 'burritos'})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 20 })
    console.log(person);

   
}
queryChain()