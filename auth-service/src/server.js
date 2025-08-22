import dotenv from "dotenv";
dotenv.config();

import createApp from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  const app = createApp();
  app.listen(PORT, () => console.log(`🚀 Auth Service listening on :${PORT}`));
})();
