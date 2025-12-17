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
  const [phonetics, setPhonetics] = useState('');
  const [loadingPhonetics, setLoadingPhonetics] = useState(false);
  const [phoneticSource, setPhoneticSource] = useState('');

  const fetchPhonetics = async (word, morphemeAnalysis) => {
    setLoadingPhonetics(true);
    setPhoneticSource('');
    try {
      // Try the full word first
      let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);

      if (response.ok) {
        const data = await response.json();
        // Try to get IPA phonetic text from various possible locations
        const phoneticText = data[0]?.phonetic ||
                            data[0]?.phonetics?.find(p => p.text && p.text.startsWith('/'))?.text ||
                            data[0]?.phonetics?.find(p => p.text)?.text ||
                            '';
        if (phoneticText) {
          setPhonetics(phoneticText);
          setPhoneticSource('dictionary');
          setLoadingPhonetics(false);
          return;
        }
      }

      // If the full word failed, try to get phonetics for the root word
      if (morphemeAnalysis && morphemeAnalysis.length > 0) {
        const rootMorpheme = morphemeAnalysis.find(m => m.type === 'root');
        if (rootMorpheme && rootMorpheme.text !== word.toLowerCase()) {
          response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${rootMorpheme.text}`);
          if (response.ok) {
            const data = await response.json();
            const phoneticText = data[0]?.phonetic ||
                                data[0]?.phonetics?.find(p => p.text && p.text.startsWith('/'))?.text ||
                                data[0]?.phonetics?.find(p => p.text)?.text ||
                                '';
            if (phoneticText) {
              setPhonetics(phoneticText + ' (root)');
              setPhoneticSource('root');
              setLoadingPhonetics(false);
              return;
            }
          }
        }
      }

      // If still no result, set empty
      setPhonetics('');
      setPhoneticSource('unavailable');
    } catch (error) {
      console.error('Error fetching phonetics:', error);
      setPhonetics('');
      setPhoneticSource('error');
    } finally {
      setLoadingPhonetics(false);
    }
  };

  const handleAnalyze = async (word) => {
    const result = analyzeMorphemes(word);
    setAnalysis(result);
    if (word && word.trim()) {
      // Fetch phonetics with the morpheme analysis
      fetchPhonetics(word, result);
    }
  };

  const handleExampleClick = (word) => {
    setInputWord(word);
    handleAnalyze(word);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header with floating animation */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mb-2 animate-gradient">
              Word Analyzer
            </h1>
            <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Explore Morphology & Phonology
          </p>
        </div>

        {/* Educational Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-purple-100 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What are Morphemes?
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Morphemes are the smallest meaningful units in a language. Let's explore the building blocks:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="group border-l-4 border-green-500 pl-4 py-2 hover:bg-green-50 transition-all duration-300 rounded-r-lg hover:pl-6">
              <h3 className="font-bold text-green-700 text-lg">
                Root (Base)
              </h3>
              <p className="text-sm text-gray-600">The core meaning of the word. Can often stand alone as a free morpheme.</p>
            </div>
            <div className="group border-l-4 border-blue-500 pl-4 py-2 hover:bg-blue-50 transition-all duration-300 rounded-r-lg hover:pl-6">
              <h3 className="font-bold text-blue-700 text-lg">
                Prefix
              </h3>
              <p className="text-sm text-gray-600">Added to the beginning of a word. Usually bound morphemes that change meaning.</p>
            </div>
            <div className="group border-l-4 border-orange-500 pl-4 py-2 hover:bg-orange-50 transition-all duration-300 rounded-r-lg hover:pl-6">
              <h3 className="font-bold text-orange-700 text-lg">
                Suffix
              </h3>
              <p className="text-sm text-gray-600">Added to the end of a word. Can be inflectional (grammar) or derivational (new word).</p>
            </div>
            <div className="group border-l-4 border-purple-500 pl-4 py-2 hover:bg-purple-50 transition-all duration-300 rounded-r-lg hover:pl-6">
              <h3 className="font-bold text-purple-700 text-lg">
                Free vs Bound
              </h3>
              <p className="text-sm text-gray-600">Free morphemes can stand alone (e.g., "break"). Bound morphemes must attach to other morphemes (e.g., "-able").</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300">
          <label className="block text-2xl font-bold text-gray-800 mb-4">
            Enter a word to analyze:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze(inputWord)}
              placeholder="Type any word..."
              className="flex-1 px-6 py-4 border-2 border-purple-300 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 text-lg transition-all duration-300 hover:border-purple-400"
            />
            <button
              onClick={() => handleAnalyze(inputWord)}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Analyze
            </button>
          </div>

          {/* Example words */}
          <div className="mt-8">
            <p className="text-sm font-semibold text-gray-600 mb-3">
              Try these examples:
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleWords.map((word, idx) => (
                <button
                  key={word}
                  onClick={() => handleExampleClick(word)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-full text-sm font-medium text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md border border-purple-200"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-10 border-2 border-purple-200 animate-slide-up">
            {/* Phonology Section - Prominent Display */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-800 mb-4">
                Phonology Analysis
              </h2>
              {loadingPhonetics ? (
                <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8 rounded-2xl border-2 border-blue-200 animate-pulse">
                  <p className="text-xl text-gray-600 text-center">Loading phonetics...</p>
                </div>
              ) : phonetics ? (
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                      IPA Transcription {phoneticSource === 'root' && '(from root word)'}
                    </p>
                    <p className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                      {phonetics}
                    </p>
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                      <div className="bg-white/70 p-4 rounded-xl">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Word</p>
                        <p className="text-2xl font-bold text-gray-800">{inputWord}</p>
                      </div>
                      <div className="bg-white/70 p-4 rounded-xl">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Syllables</p>
                        <p className="text-2xl font-bold text-gray-800">{phonetics.replace(' (root)', '').split(/[ˈˌ.\s]/).filter(s => s.length > 0).length}</p>
                      </div>
                      <div className="bg-white/70 p-4 rounded-xl">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Notation</p>
                        <p className="text-2xl font-bold text-gray-800">IPA</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-300">
                  <div className="text-center">
                    <p className="text-gray-700 font-semibold mb-2">Phonetic data not available</p>
                    <p className="text-sm text-gray-600">
                      The dictionary API doesn't have phonetic transcription for this word.
                      This often happens with compound words, rare words, or inflected forms.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Morpheme Breakdown Section */}
            <div>
              {/* Visual morpheme boxes */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-12 py-6">
                {analysis.map((morpheme, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center animate-pop-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`group relative px-8 py-5 rounded-2xl text-white text-2xl font-black shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-rotate-2 cursor-pointer ${
                        morpheme.type === 'root'
                          ? 'bg-gradient-to-br from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700'
                          : morpheme.type === 'prefix'
                          ? 'bg-gradient-to-br from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700'
                          : 'bg-gradient-to-br from-orange-400 to-red-600 hover:from-orange-500 hover:to-red-700'
                      }`}
                    >
                      {morpheme.text}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                    </div>
                    <div className="mt-2 px-3 py-1 bg-gray-100 rounded-full">
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                        {morpheme.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed breakdown */}
              <div className="space-y-4">
                {analysis.map((morpheme, index) => (
                  <div
                    key={index}
                    className={`group border-l-4 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                      morpheme.type === 'root'
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100'
                        : morpheme.type === 'prefix'
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100'
                        : 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <h3 className="text-xl font-black text-gray-800">
                        "{morpheme.text}" - {morpheme.type.charAt(0).toUpperCase() + morpheme.type.slice(1)}
                      </h3>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                        morpheme.bound ? 'bg-purple-200 text-purple-800' : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {morpheme.bound ? 'Bound' : 'Free'} morpheme
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2 text-lg">
                      <strong className="text-gray-900">Meaning:</strong> {morpheme.meaning}
                    </p>
                    {morpheme.type !== 'root' && (
                      <p className="text-gray-700 text-lg">
                        <strong className="text-gray-900">Type:</strong> {morpheme.subtype.charAt(0).toUpperCase() + morpheme.subtype.slice(1)}
                        {morpheme.subtype === 'inflectional' && ' (changes grammatical form)'}
                        {morpheme.subtype === 'derivational' && ' (creates new word/changes meaning or part of speech)'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-10 p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-2xl border-2 border-purple-200">
              <h3 className="font-black text-gray-800 mb-3 text-xl">
                Analysis Summary
              </h3>
              <p className="text-gray-800 text-lg font-semibold mb-3">
                The word "<span className="text-purple-700 font-black text-xl">{inputWord}</span>" contains{' '}
                <span className="text-pink-700 font-black text-xl">{analysis.length}</span> morpheme{analysis.length > 1 ? 's' : ''}:
              </p>
              <div className="flex flex-wrap gap-3">
                {analysis.filter(m => m.type === 'prefix').length > 0 && (
                  <div className="bg-white px-4 py-2 rounded-full shadow-md">
                    <span className="font-bold text-blue-700">
                      {analysis.filter(m => m.type === 'prefix').length} prefix{analysis.filter(m => m.type === 'prefix').length > 1 ? 'es' : ''}
                    </span>
                  </div>
                )}
                {analysis.filter(m => m.type === 'root').length > 0 && (
                  <div className="bg-white px-4 py-2 rounded-full shadow-md">
                    <span className="font-bold text-green-700">
                      {analysis.filter(m => m.type === 'root').length} root morpheme{analysis.filter(m => m.type === 'root').length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {analysis.filter(m => m.type === 'suffix').length > 0 && (
                  <div className="bg-white px-4 py-2 rounded-full shadow-md">
                    <span className="font-bold text-orange-700">
                      {analysis.filter(m => m.type === 'suffix').length} suffix{analysis.filter(m => m.type === 'suffix').length > 1 ? 'es' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/80 backdrop-blur px-8 py-4 rounded-2xl shadow-lg border border-purple-200">
            <p className="text-gray-800 font-bold">
              Created for LX 250: Introduction to Linguistics
            </p>
            <p className="text-sm text-gray-600 mt-2">
              A tool to help students understand morphological & phonological analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
