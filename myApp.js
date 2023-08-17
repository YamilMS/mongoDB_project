require('dotenv').config();

const mongoose = require('mongoose');

//This line establishes a connection to the MongoDB database. 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//Mongoose schema named personSchema
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});


//MODEL PERSON created using the defined personSchema schema
let Person= mongoose.model("Person", personSchema);

//Create array of personSchemas
let arrayOfPeople= [
    {name: "Jane Doe", age: 25, favoriteFoods: ["salad", "wine"]},
    {name: "Alf", age: 60, favoriteFoods: ["cats", "coke"]},
    {name: "Jack The Reaper", age: 28, favoriteFoods: ["Guts", "meat"]}
  ]



const createAndSavePerson = (done) => {
  //Intance of Person
  const johnDoe = new Person({name: "John Doe", age: 32, favoriteFoods: ["pizza", "burgers"]});
  
  //Save the instance of Person in the database
  johnDoe.save((err, data) => {
    if (err) return console.log(err);
    done(null, data); 
  })

};

const createManyPeople = (arrayOfPeople, done) => {
  //Create several people using the Model.create(collection, callback) method
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people); 
  })
  
};

const findPeopleByName = (personName, done) => {
  //find accept two parameter, the first one is the query, the second one is the callback
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound); 
  })
};

const findOneByFood = (food, done) => {
  //findOne accept two parameter, the first one is the query, the second one is the callback
  //findOne is a method that will return the first element that matches the query, if no match is found, it will return null. 
  Person.findOne({favoriteFoods: food}, (err, personFound) =>{
    if (err) return console.log(err);
    done(null, personFound); 
  })
};

const findPersonById = (personId, done) => {
  //All models have a column called _id, which is a unique identifier for each document
  Person.findById(personId, (err, personFound) =>{
    if (err) return console.log(err);
    done(null, personFound); 
  })

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, (err, personFound) => {
    //Check if there is an error
    if (err) return console.log(err);

    //add the food to the person's favoriteFoods array
    personFound.favoriteFoods.push(foodToAdd);

    //Save the person's updated data in the database
    personFound.save((err, updatePerson) => {
      if (err) return console.log(err);
      done(null, updatePerson); 
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  //This method accepts three parameters: the query, the update, and the options and lastly the callback.
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatePerson) => {
    if (err) return console.log(err);
    done(null, updatePerson); 
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.log(err);
    done(null, removedPerson); 
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
