import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

try {
  await connectDB();
} catch (error) {
  console.log(`error connecting to MongoDB : `, error.message);
}

server.listen(PORT, () => {
  console.log(`server running on : http://localhost:${PORT}`);
});
