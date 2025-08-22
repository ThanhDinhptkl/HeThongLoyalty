import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

export default function initPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const googleId = profile.id;
          const email = profile.emails?.[0]?.value?.toLowerCase();

          let user = await User.findOne({ googleId });

          if (!user && email) {
            user = await User.findOne({ email });
            if (user) {
              user.googleId = googleId;
              user.provider = "google";
              await user.save();
            }
          }

          // Nếu vẫn chưa có -> tạo mới
          if (!user) {
            user = await User.create({
              email,
              googleId,
              provider: "google",
              role: "customer",
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}
