import express from "express";
import dotenv from "dotenv";
import path from "path";
import { DBConnect } from "./config/db.js";
import router from "./routes/product.route.js";

const app = express();
dotenv.config();

const __dirname = path.resolve();

app.use(express.json());
const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

app.use("/api/products", router)

app.listen(PORT, () => {
  DBConnect();
  console.log("server started at http://localhost:" +PORT);
});