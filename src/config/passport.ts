import { Strategy, ExtractJwt } from "passport-jwt";
import UserSchema from "../models/user";
import config from "../config/index";
import { request, response } from "express";

module.exports = function (passport: { use: (arg0: Strategy) => void }) {
  // we'll be using authorization in header
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: config.secret
  };

  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await UserSchema.findById(jwt_payload._id);
        // const user = await UserSchema.findOne({username: "admin"});
        // response.send({user});

        if (user) {
          const userd = user.toObject();
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
