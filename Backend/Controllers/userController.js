const User = require('../Models/User')
const jwt = require('jsonwebtoken');


// handle errors

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''}

    if (err.message === 'incorrect email'){
        errors.email = 'that email is not registered';
    }

    if (err.message === 'incorrect password'){
        errors.password = 'that password is not registered';
    }


    if (err.code === 11000){
        errors.email = "that email is already registered"
        return errors;
    
        };

        if (err.message.includes('user validation faild')){
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        })
    
    }
    return errors;
}

const maxAge = 3 * 24 * 60 *60 ;
const createToken = (id,email,name,typeOfUser) => {
    return jwt.sign({id,email,name,typeOfUser}, 'noura secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_post = async (request,response) => {
    const {email, password, typeOfUser, name} = request.body;
   try {
      const user = await  User.create({email, password, typeOfUser, name})
      const token = createToken(user._id,user.email,user.name,user.typeOfUser)
      response.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000 })
      response.status(201).json({user:token})
   }
   catch (err) {
      const errors = handleErrors(err);
      console.log(errors);
      response.status(400).json({errors});
   }
}

module.exports.login_post = async (request,response) => {
    const {email, password} = request.body;
        try {
            const user = await User.login(email,password);
            const token = createToken(user._id,user.email,user.name,user.typeOfUser)
            response.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000 })
            response.status(200).json({user: token})

        }
        catch (err) {
            const errors = handleErrors(err);
            response.status(400).json({errors});
        }
}

module.exports.logout_get = (request,response) => {
    response.cookie('jwt','',{maxAge: 1});
    response.redirect('/');
}