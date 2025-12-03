import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middlewares/authMiddleware.js";

// Route Imports
import tenantRoutes from "./routes/tenantRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import leaseRoutes from "./routes/leaseRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

// Config
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World! , Server is running");
});

app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);
app.use("/properties", propertyRoutes);
app.use("/leases", leaseRoutes);
app.use("/applications", applicationRoutes);

// Server
const port = process.env.PORT || 3002;

app.listen(port, (err) => {
  if (err) console.error(`Failed to start application because of : ${err}`);
  console.log(`Application running on http://localhost:${port}`);
});
