import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import initPassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

const createApp = () => {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(bodyParser.json());

  initPassport();
  app.use(passport.initialize());


  app.use("/auth", authRoutes);


  app.get("/health", (_req, res) => res.json({ ok: true, service: "auth" }));


  app.use((_req, res) => res.status(404).json({ error: "NotFound" }));

  return app;
};

export default createApp;
