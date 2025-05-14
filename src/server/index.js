import express from 'express';
import chatbotRouter from './api/chatbot.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/chatbot', chatbotRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});