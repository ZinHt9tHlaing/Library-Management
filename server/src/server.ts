import express, { Express } from "express";
import { routes } from "./routes/routeIndex";
import { logger } from "./utils/logger";
import bodyParser from "body-parser";
import { config } from "./config";
import mongoose from "mongoose";
import cors from "cors";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// dynamic routes
routes(app);

const PORT = config.serverPort.port;

(async function startUp() {
  try {
    await mongoose.connect(config.mongoDB.url!, {
      retryWrites: true,
      authMechanism: "DEFAULT"
    });

    logger.info("Connected to MongoDB");

    app.get("/health", (req, res) => {
      res.status(200).json({ message: "OK" });
    });

    app.listen(PORT, () => {
      logger.info(`Server running on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
  }
})();
