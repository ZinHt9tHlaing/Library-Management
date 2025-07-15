import "dotenv/config";

const MONGO_USERNAME: string = process.env.MONGODB_USERNAME || "";
const MONGO_PASSWORD: string = process.env.MONGODB_PASSWORD || "";

const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zk3kp.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;

export const config = {
  mongoDB: {
    url: MONGO_URL
  },
  serverPort: {
    port: PORT
  }
};
