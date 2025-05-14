import { pipeline } from '@xenova/transformers';

const classifier = await pipeline('zero-shot-classification', 
  'Xenova/mobilebert-uncased-mnli');

export async function generateRecommendations(summary) {
  const candidate_labels = [
    "Follow up with more detailed documents",
    "Schedule a meeting to discuss",
    "Share with team members for review",
    "Check related policy documents",
    "Prioritize for immediate action",
    "Archive for future reference"
  ];

  const result = await classifier(summary, candidate_labels);
  return result.labels.slice(0, 3); // Return top 3 recommendations
}