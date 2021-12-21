const db = require ( '../db/db');
const  mongoose  = db.mongoose;
const Schema =  db.Schema;
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new Schema({

    name: {type: String,
        required: [true, "please enter a name"]},
    email: { 
        type: String,
        required: [true, "please enter an email"], 
        unique: true, 
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
     },
    password: { 
        type: String, 
        required: [true, "please enter an password"],
        minlength: [6, "enter more than 6"]
    },
    typeOfUser: {
        type: String,
        enum: ['user','admin'],
        default: "user"
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