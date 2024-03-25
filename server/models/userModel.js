const bcrypt = require ('bcrypt')
const mongoose = require('mongoose')
const validator = require ('validator')
const Schema = mongoose.Schema
const userSchema = new Schema ({
    firstname:{
      type: String,
    },
    lastname:{
      type: String,
    },
    email:{
      type: String,
      required: true,
      unique : true
    },
    password:{
      type: String,
      required: true,
    },
    role:{
      type:String,
      default:"exhibitor"
    },
  })
// static signup method
userSchema.statics.signup= async function(firstname,lastname,email,password,role = "exhibitor"){
  //validation 
  if(!email || !password || !firstname || !lastname){
      throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)){
      throw Error ('Email is not valid')
  }
  /*if(!validator.isStrongPassword(password)){
      throw Error('Password not strong enough')
  }*/
  const exists = await this.findOne({email})
  if(exists){
      throw Error('Email already in use ')
  }
  // password
 // const salt = await bcrypt.genSalt(10)
  //const hash = await bcrypt.hash(password,salt)
  //const user = await this.create({firstname,lastname,role,email,password:hash})
  const user = await this.create({firstname,lastname,role,email,password})

  return user
}
//static login method
userSchema.statics.login = async function (email,password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email ')
    }
    /*const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect password')
    }*/
    return user
}
userSchema.statics.findById = async function (id) {
    try {
      const user = await this.findOne({ _id: id });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  userSchema.statics.getUserProfile = async function (userId) {
    try {
      const user = await this.findOne({ _id: userId });
      if (!user) {
        throw new Error('User not found');
      }
      const { _id, firstname, lastname, email } = user;
      return { id: _id, firstname, lastname, email };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
 userSchema.statics.changeUserProfile = async function(userId, newProfile) {
    try {
      const user = await this.findOneAndUpdate({ _id: userId }, { $set: newProfile }, { new: true });
      if (!user) {
        throw new Error('User not found');
      }
      const { _id, firstname, lastname, email } = user;
      return { id: _id, firstname, lastname, email };
    } catch (error) {
      console.error(error);
      throw new Error('Unable to update user profile');
    }
  };
  userSchema.statics.resetPassword = async function (email, newPassword) {
    // Vérifier si l'e-mail existe dans la base de données
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error('Email not found');
    }
  
    // Générer un nouveau hash pour le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);
  
    // Mettre à jour le mot de passe de l'utilisateur
    user.password = newHashedPassword;
    await user.save();
  };
  
module.exports = mongoose.model('User',userSchema)