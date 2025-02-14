import 'reflect-metadata';
import express from 'express';
// import cors from 'cors';
import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes';
import companyRoutes from './routes/companyRoutes';

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/company', companyRoutes);

// Start Server After Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected!');
    app.listen(3001, () => {
      console.log('🚀 Server running on http://localhost:3001');
    });
  })
  .catch((error) => console.error('❌ Database error:', error));
