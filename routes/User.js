import express from "express";
import {
  editProfile,
  followUser,
  getAllUser,
  getLoggedUser,
  getUser,
  getUserById,
} from "../controllers/User.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:username/:visitorId/user", getUser);
router.get("/:username/logged", getLoggedUser);
router.patch("/:userId/edit", editProfile);
router.patch("/:ownId/:followId", followUser);
router.get("/:userId/get", getUserById);

export default router;
