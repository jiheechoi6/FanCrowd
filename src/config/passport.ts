import {Strategy, ExtractJwt} from "passport-jwt";
import UserSchema from "../models/user";

module.exports = function(passport: { use: (arg0: Strategy) => void; }){
    // we'll be using authorization in header
    let opts = {jwtFromRequest: ExtractJwt.fromAuthHeader()};
    
    passport.use(new Strategy(opts, (jwt_payload, done) => {
        try{
            const user = UserSchema.findById(jwt_payload._doc._id);
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        }catch(error){
            return done(error, false);
        }
    }));
}
