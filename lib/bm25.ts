import { knowledgeBase, KnowledgeChunk } from "./knowledge-base";

// Simple BM25-like keyword search
export function getRelevantChunks(query: string, chunks: KnowledgeChunk[], topN: number = 3): KnowledgeChunk[] {
  const queryTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  
  const scores = chunks.map(chunk => {
    const text = (chunk.title + " " + chunk.content).toLowerCase();
    let score = 0;
    
    queryTerms.forEach(term => {
      const regex = new RegExp(term, 'gi');
      const matches = text.match(regex);
      if (matches) {
        score += matches.length;
      }
    });
    
    return { chunk, score };
  });
  
  return scores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(s => s.chunk);
}
