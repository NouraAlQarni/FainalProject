const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new Schema({

    email: { 
        type: String,
        required: [true, "please enter an email"], 
        unique: true, 
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
     },
    password: { 
        type: String, 
        required: [true, "please enter an password"]},
    typeOfUser: {
        type: String,
    }
    
 
})

// fire a function after doc saved to db
userSchema.post('save', function (doc,next) {
    console.log('new user was created and save', doc);
    next();
})

// fire a function before doc saved to db
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.statics.login = async function (email,password) {
    const user = await this.findOne({email});
    if (user){
      const user1 = await bcrypt.compare(password, user.password)
        if (user1){
            return user;
        }
        throw Error ('incorrect password')
    }
    throw Error ('incorrect email')
}

const User = mongoose.model('user', userSchema);
module.exports = User