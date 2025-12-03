import { Router } from "express";
import multer from "multer";
import {
  createProperty,
  getProperties,
  getProperty,
} from "../controllers/propertyControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  createProperty
);

export default router;
