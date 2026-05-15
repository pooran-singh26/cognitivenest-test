import express from "express";
import dotenv from "dotenv";
import walletRoutes from "./routes/walletRoutes.js";
import sequelize from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1", walletRoutes);



const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    app.listen(port, () => {
      console.log("server up & running ");
    });
  } catch (err) {
    console.error("Server failed: ", err);
  }
}

startServer();
