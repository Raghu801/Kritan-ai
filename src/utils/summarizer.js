import { pipeline } from '@xenova/transformers';
import pdf from 'pdf-parse';
import { extractTextFromDocx } from 'docx-extractor';

const summarizer = await pipeline('summarization');

export async function summarizeDocument(buffer, filename) {
  const ext = path.extname(filename).toLowerCase();
  let text = '';

  switch (ext) {
    case '.pdf':
      const pdfData = await pdf(buffer);
      text = pdfData.text;
      break;
    case '.docx':
      text = await extractTextFromDocx(buffer);
      break;
    case '.txt':
      text = buffer.toString('utf-8');
      break;
    default:
      throw new Error('Unsupported file type');
  }

  const summary = await summarizer(text, {
    max_length: 200,
    min_length: 50,
    do_sample: false
  });

  return summary[0].summary_text;
}