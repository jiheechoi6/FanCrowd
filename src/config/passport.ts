import {Strategy, ExtractJwt} from "passport-jwt";
import UserSchema from "../models/user";
import config from "../config/index";

module.exports = function(passport: { use: (arg0: Strategy) => void; }){
    // we'll be using authorization in header
    let opts = {jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), secretOrKey: config.secret};
    
    passport.use(new Strategy(opts, (jwt_payload, done) => {
        try{
            const user = UserSchema.findById(jwt_payload.data._id);
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
