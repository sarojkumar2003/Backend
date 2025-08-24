const Passport = require('passport');
const localStrategy = require('passport-local');
const Person = require('./module/Person');
const passport = require('passport');

passport.use(new localStrategy (async (username, password, done) =>{
    

    try {
        console.log("Recived Candidate Password", username, password);
        const user = await Person.findOne({username});

        if(!user)
            return done(null, false, {message: "Incorrect Password"});
        const ispasswordMathc = (user.password === password? true :false);

        if(ispasswordMathc){
            return done (null, user);
        }else{
            return done(null, false, {message: "Incorrect Password"});
        }
    } catch (error) {
        return done(error);
    }
    
}));

module.exports = passport;


