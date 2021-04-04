import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/user";
import config from "../config/index";
import { IRequestUser } from "../interfaces/IUser";

export default (passport: { use: (arg0: Strategy) => void }) => {
  // we'll be using authorization in header
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: config.jwtSecret
  };

  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const userDoc = await User.findById(jwt_payload._id);
        if (!userDoc) {
          return done(null, false);
        }
        const user: IRequestUser = {
          _id: userDoc._id,
          role: userDoc.role,
          username: userDoc.username,
          profileURL: userDoc.profileURL
        };

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
