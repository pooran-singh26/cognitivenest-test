import express from "express";
import {
  appendBalance,
  createUserProfile,
  moneyTransfer,
} from "../controllers/walletController.js";

const router = express.Router();

router.get("/health", async (req, resp) => {
  return resp.json({ status: true, message: "up & ruuning!!" });
});

router.post("/users", createUserProfile);

router.post("/wallets/:userId/add-balance", appendBalance);

router.post("/wallets/transfer", moneyTransfer);

export default router;
