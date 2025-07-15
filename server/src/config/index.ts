import "dotenv/config";

const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;

export const config = {
  mongoDB: {
    url: process.env.MONGODB_URL
  },
  serverPort: {
    port: PORT,
    rounds: 10
  }
};
