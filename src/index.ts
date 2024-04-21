import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './databases/config/dbconnect';
import router from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
// Middleware
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api', router);

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

export default app