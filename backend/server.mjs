import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routers/router.mjs";
import db from "./db/db.mjs";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/", router);

db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
