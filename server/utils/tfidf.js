// utils/tfidf.js (ES7 module format)

export function tokenize(text) {
  if (!text || typeof text !== 'string') return []; // safe fallback
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}


export function termFrequency(words) {
  const tf = {};
  words.forEach(word => {
    tf[word] = (tf[word] || 0) + 1;
  });
  const totalWords = words.length;
  Object.keys(tf).forEach(word => {
    tf[word] /= totalWords;
  });
  return tf;
}

export function inverseDocumentFrequency(docs) {
  const idf = {};
  const totalDocs = docs.length;

  docs.forEach(doc => {
    const seen = new Set();
    doc.forEach(word => {
      if (!seen.has(word)) {
        idf[word] = (idf[word] || 0) + 1;
        seen.add(word);
      }
    });
  });

  Object.keys(idf).forEach(word => {
    idf[word] = Math.log(totalDocs / idf[word]);
  });

  return idf;
}

export function tfidfVector(words, idf) {
  const tf = termFrequency(words);
  const tfidf = {};

  Object.keys(tf).forEach(word => {
    tfidf[word] = tf[word] * (idf[word] || 0);
  });

  return tfidf;
}

export function cosineSimilarity(vecA, vecB) {
  const intersection = Object.keys(vecA).filter(word => word in vecB);

  let dotProduct = 0;
  intersection.forEach(word => {
    dotProduct += vecA[word] * vecB[word];
  });

  const magnitude = vec =>
    Math.sqrt(Object.values(vec).reduce((sum, val) => sum + val * val, 0));

  const magA = magnitude(vecA);
  const magB = magnitude(vecB);

  if (magA === 0 || magB === 0) return 0;

  return dotProduct / (magA * magB);
}
