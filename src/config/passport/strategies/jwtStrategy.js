import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../../../models/user";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "coderhouse",
};

export const strategyJWT = new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      console.log(payload);
      const user = await userModel.findById(payload._id);
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (e) {
      done(e, null);
    }
  }
);
