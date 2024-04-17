import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/dbconnect';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import dotenv from 'dotenv';
import path from 'path';
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
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve index.html
app.get('*', (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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