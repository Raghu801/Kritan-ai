import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FileProcessor({ sessionId }) {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState([]);

  const handleProcess = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sessionId', sessionId);

      const response = await axios.post('/api/chatbot/process', formData);
      
      setOutput(response.data);
      setHistory(prev => [...prev, {
        timestamp: response.data.timestamp,
        action: `Processed ${file.name}`
      }]);
      
    } catch (error) {
      console.error('Processing error:', error);
      setOutput({ error: error.message });
    }
  };

  const submitFeedback = async () => {
    await axios.post('/api/chatbot/feedback', {
      sessionId,
      feedback,
      timestamp: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
      })
    });
    setFeedback('');
  };

  return (
    <div className="chatbot-processor">
      <div className="file-section">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.docx,.txt"
        />
        <button onClick={handleProcess}>Process Document</button>
      </div>

      {output && (
        <div className="output-section">
          <h3>Processed at: {output.timestamp}</h3>
          
          <div className="summary">
            <h4>Summary:</h4>
            <p>{output.summary}</p>
          </div>

          <div className="recommendations">
            <h4>Recommendations:</h4>
            <ul>
              {output.recommendations?.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="feedback">
            <textarea
              placeholder="Your feedback about this session..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button onClick={submitFeedback}>Submit Feedback</button>
          </div>
        </div>
      )}

      <div className="session-history">
        <h3>Session History</h3>
        <ul>
          {history.map((item, i) => (
            <li key={i}>
              [{item.timestamp}] {item.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}