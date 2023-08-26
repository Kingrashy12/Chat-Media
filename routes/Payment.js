import express from "express";
import { PayClient } from "../controllers/Payment.js";

const router = express.Router();

router.post("/new", PayClient);

export default router;
