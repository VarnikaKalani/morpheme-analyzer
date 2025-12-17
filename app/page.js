'use client';

import { useState } from 'react';

// Morpheme database with comprehensive examples
const morphemeDatabase = {
  // Common prefixes
  prefixes: {
    'un': { type: 'derivational', meaning: 'not, opposite of' },
    're': { type: 'derivational', meaning: 'again' },
    'pre': { type: 'derivational', meaning: 'before' },
    'mis': { type: 'derivational', meaning: 'wrongly' },
    'dis': { type: 'derivational', meaning: 'not, opposite of' },
    'in': { type: 'derivational', meaning: 'not' },
    'im': { type: 'derivational', meaning: 'not' },
    'il': { type: 'derivational', meaning: 'not' },
    'ir': { type: 'derivational', meaning: 'not' },
    'non': { type: 'derivational', meaning: 'not' },
    'anti': { type: 'derivational', meaning: 'against' },
    'de': { type: 'derivational', meaning: 'reverse, remove' },
    'over': { type: 'derivational', meaning: 'excessive' },
    'under': { type: 'derivational', meaning: 'insufficient' },
    'sub': { type: 'derivational', meaning: 'under, below' },
    'super': { type: 'derivational', meaning: 'above, beyond' },
    'semi': { type: 'derivational', meaning: 'half' },
    'mid': { type: 'derivational', meaning: 'middle' },
    'ex': { type: 'derivational', meaning: 'former, out of' },
  },
  
  // Common suffixes
  suffixes: {
    // Inflectional (grammatical)
    's': { type: 'inflectional', meaning: 'plural or 3rd person singular' },
    'es': { type: 'inflectional', meaning: 'plural' },
    'ed': { type: 'inflectional', meaning: 'past tense' },
    'ing': { type: 'inflectional', meaning: 'present participle/gerund' },
    'er': { type: 'inflectional', meaning: 'comparative (can also be derivational agent)' },
    'est': { type: 'inflectional', meaning: 'superlative' },
    
    // Derivational (creates new words)
    'able': { type: 'derivational', meaning: 'capable of' },
    'ible': { type: 'derivational', meaning: 'capable of' },
    'al': { type: 'derivational', meaning: 'relating to' },
    'ful': { type: 'derivational', meaning: 'full of' },
    'less': { type: 'derivational', meaning: 'without' },
    'ly': { type: 'derivational', meaning: 'in a manner' },
    'ness': { type: 'derivational', meaning: 'state of being' },
    'tion': { type: 'derivational', meaning: 'act or process' },
    'sion': { type: 'derivational', meaning: 'act or process' },
    'ment': { type: 'derivational', meaning: 'result or action' },
    'ity': { type: 'derivational', meaning: 'state or quality' },
    'ty': { type: 'derivational', meaning: 'state or quality' },
    'ous': { type: 'derivational', meaning: 'having quality of' },
    'ious': { type: 'derivational', meaning: 'having quality of' },
    'ive': { type: 'derivational', meaning: 'tending to' },
    'ize': { type: 'derivational', meaning: 'to make' },
    'ise': { type: 'derivational', meaning: 'to make' },
    'ist': { type: 'derivational', meaning: 'one who does' },
    'ian': { type: 'derivational', meaning: 'relating to' },
    'ship': { type: 'derivational', meaning: 'state or quality' },
    'hood': { type: 'derivational', meaning: 'state or condition' },
  }
};

// Function to analyze a word and break it into morphemes
function analyzeMorphemes(word) {
  if (!word || word.trim() === '') {
    return null;
  }

  word = word.toLowerCase().trim();
  const morphemes = [];
  
  let remaining = word;
  
  // Check for prefixes
  for (const [prefix, info] of Object.entries(morphemeDatabase.prefixes)) {
    if (remaining.startsWith(prefix) && remaining.length > prefix.length) {
      morphemes.push({
        text: prefix,
        type: 'prefix',
        subtype: info.type,
        meaning: info.meaning,
        bound: true
      });
      remaining = remaining.slice(prefix.length);
      break;
    }
  }
  
  // Check for suffixes
  let suffix = null;
  for (const [suf, info] of Object.entries(morphemeDatabase.suffixes)) {
    if (remaining.endsWith(suf) && remaining.length > suf.length) {
      suffix = {
        text: suf,
        type: 'suffix',
        subtype: info.type,
        meaning: info.meaning,
        bound: true
      };
      remaining = remaining.slice(0, -suf.length);
      break;
    }
  }
  
  // What's left is the root
  if (remaining) {
    morphemes.push({
      text: remaining,
      type: 'root',
      subtype: 'free',
      meaning: 'base word',
      bound: false
    });
  }
  
  // Add suffix at the end
  if (suffix) {
    morphemes.push(suffix);
  }
  
  return morphemes.length > 0 ? morphemes : null;
}

// Example words for demonstration
const exampleWords = [
  'unbreakable',
  'rewriting',
  'happiness',
  'teacher',
  'unfriendly',
  'preschool',
  'misunderstand',
  'rediscovery',
  'uncomfortable',
  'illogical',
  'replacement',
  'kindness',
  'prettier',
  'running',
  'books',
];

export default function MorphemeAnalyzer() {
  const [inputWord, setInputWord] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = (word) => {
    const result = analyzeMorphemes(word);
    setAnalysis(result);
  };

  const handleExampleClick = (word) => {
    setInputWord(word);
    handleAnalyze(word);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Interactive Morpheme Analyzer
          </h1>
          <p className="text-xl text-gray-600">
            Learn morphology by breaking words into their meaningful parts
          </p>
        </div>

        {/* Educational Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What are Morphemes?</h2>
          <p className="text-gray-700 mb-4">
            Morphemes are the smallest meaningful units in a language. Words can be broken down into different types of morphemes:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-700">Root (Base)</h3>
              <p className="text-sm text-gray-600">The core meaning of the word. Can often stand alone as a free morpheme.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-700">Prefix</h3>
              <p className="text-sm text-gray-600">Added to the beginning of a word. Usually bound morphemes that change meaning.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-red-700">Suffix</h3>
              <p className="text-sm text-gray-600">Added to the end of a word. Can be inflectional (grammar) or derivational (new word).</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-purple-700">Free vs Bound</h3>
              <p className="text-sm text-gray-600">Free morphemes can stand alone (e.g., "break"). Bound morphemes must attach to other morphemes (e.g., "-able").</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Enter a word to analyze:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze(inputWord)}
              placeholder="e.g., unbreakable"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-lg"
            />
            <button
              onClick={() => handleAnalyze(inputWord)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Analyze
            </button>
          </div>

          {/* Example words */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleWords.map((word) => (
                <button
                  key={word}
                  onClick={() => handleExampleClick(word)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Morpheme Breakdown</h2>
            
            {/* Visual morpheme boxes */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {analysis.map((morpheme, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`px-6 py-4 rounded-lg text-white text-xl font-bold ${
                      morpheme.type === 'root'
                        ? 'bg-green-500'
                        : morpheme.type === 'prefix'
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {morpheme.text}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {morpheme.type}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed breakdown */}
            <div className="space-y-4">
              {analysis.map((morpheme, index) => (
                <div
                  key={index}
                  className={`border-l-4 p-4 rounded ${
                    morpheme.type === 'root'
                      ? 'border-green-500 bg-green-50'
                      : morpheme.type === 'prefix'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-red-500 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      "{morpheme.text}" - {morpheme.type.charAt(0).toUpperCase() + morpheme.type.slice(1)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      morpheme.bound ? 'bg-purple-200 text-purple-800' : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {morpheme.bound ? 'Bound' : 'Free'} morpheme
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <strong>Meaning:</strong> {morpheme.meaning}
                  </p>
                  {morpheme.type !== 'root' && (
                    <p className="text-gray-700">
                      <strong>Type:</strong> {morpheme.subtype.charAt(0).toUpperCase() + morpheme.subtype.slice(1)}
                      {morpheme.subtype === 'inflectional' && ' (changes grammatical form)'}
                      {morpheme.subtype === 'derivational' && ' (creates new word/changes meaning or part of speech)'}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Analysis Summary:</h3>
              <p className="text-gray-700">
                The word "<strong>{inputWord}</strong>" contains <strong>{analysis.length}</strong> morpheme{analysis.length > 1 ? 's' : ''}:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {analysis.filter(m => m.type === 'prefix').length > 0 && (
                  <li>{analysis.filter(m => m.type === 'prefix').length} prefix(es)</li>
                )}
                {analysis.filter(m => m.type === 'root').length > 0 && (
                  <li>{analysis.filter(m => m.type === 'root').length} root morpheme(s)</li>
                )}
                {analysis.filter(m => m.type === 'suffix').length > 0 && (
                  <li>{analysis.filter(m => m.type === 'suffix').length} suffix(es)</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>Created for LX 250: Introduction to Linguistics</p>
          <p className="text-sm mt-2">A tool to help students understand morphological analysis</p>
        </div>
      </div>
    </div>
  );
}
