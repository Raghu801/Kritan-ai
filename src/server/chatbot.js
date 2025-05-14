import express from 'express';
import multer from 'multer';
import { summarizeDocument } from '../../utils/summarizer.js';
import { generateRecommendations } from '../../utils/recommender.js';
import { getCurrentIST } from '../../utils/timeUtils.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/process', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const { sessionId } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const processedAt = getCurrentIST();
    const summary = await summarizeDocument(file.buffer, file.originalname);
    const recommendations = await generateRecommendations(summary);

    res.json({
      timestamp: processedAt,
      summary,
      recommendations,
      filename: file.originalname
    });

  } catch (error) {
    console.error('Chatbot processing error:', error);
    res.status(500).json({ 
      error: error.message,
      timestamp: getCurrentIST()
    });
  }
});

export default router;