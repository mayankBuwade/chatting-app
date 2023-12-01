import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Connection from "./database/db.js";
import Route from "./routes/route.js";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Route);

Connection();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
