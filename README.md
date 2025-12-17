https://word-analyzer-beta.vercel.app/

# Word Analyzer

An interactive educational web application for learning **morphology** and **phonology** through real-time word analysis. Students can explore how words are built from meaningful parts (morphemes) and see their phonetic transcriptions in IPA notation.

## Features

### Morphology Analysis
- **Visual Morpheme Breakdown**: Color-coded morphemes with smooth animations
  - Roots in green gradient
  - Prefixes in blue gradient
  - Suffixes in orange/red gradient
- **Educational Labels**: Shows whether morphemes are free/bound and inflectional/derivational
- **Comprehensive Explanations**: Each morpheme includes meaning and grammatical information
- **Interactive Interface**: Type any word and see it broken down instantly

### Phonology Analysis
- **IPA Transcription**: Displays International Phonetic Alphabet notation for words
- **Syllable Count**: Automatically calculates number of syllables from phonetic data
- **Prominent Display**: Large, gradient-styled phonetic transcription for easy reading
- **Smart Fallback**: When full word phonetics aren't available, attempts to fetch root word phonetics

### User Interface
- **Modern Design**: Gradient backgrounds, smooth animations, and glassmorphism effects
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Example Words**: Pre-loaded examples demonstrating different morphological structures
- **Hover Effects**: Interactive elements with scale and rotation animations

## What Students Learn

### Morphology Concepts
1. **Morpheme Types**: Understanding roots, prefixes, and suffixes
2. **Free vs. Bound Morphemes**: Identifying which morphemes can stand alone
3. **Inflectional vs. Derivational**: Distinguishing grammatical markers from word-forming affixes
4. **Word Structure**: How complex words are built from smaller meaningful units

### Phonology Concepts
1. **IPA Notation**: Reading International Phonetic Alphabet transcriptions
2. **Syllable Structure**: Understanding how words are divided into syllables
3. **Pronunciation Patterns**: Connecting spelling to sound

## Known Limitations

### IPA Phonetics Availability Issue

**Problem**: Some words display "Phonetic data not available" instead of showing IPA transcription.

**Why This Happens**:
The app uses the [Free Dictionary API](https://dictionaryapi.dev/) to fetch phonetic transcriptions. However, this API has incomplete coverage for certain types of words:

1. **Morphologically Complex Words**: Words with multiple affixes (e.g., "unbreakable", "misunderstanding") often don't have dedicated dictionary entries
2. **Inflected Forms**: Some inflected variants (e.g., "running", "prettier", "books") may not be in the database
3. **Compound Words**: Multi-morpheme compounds may lack phonetic data
4. **Rare or Specialized Words**: Less common words may not be included in the free database
5. **Very New Words**: Recently coined terms may not yet be in the dictionary

**Current Solution**:
When the app can't find phonetics for the full word, it automatically:
1. Attempts to fetch the phonetic transcription for just the root morpheme
2. Displays the root phonetics with a "(from root word)" label
3. Shows a helpful message explaining why data might be unavailable

**Example**:
- "happiness" → Shows full IPA transcription ✓
- "unbreakable" → May show "break" root phonetics as fallback
- "misunderstanding" → May show "Phonetic data not available"

**Future Improvements**:
To provide complete phonetic coverage, the app could be enhanced with:
- Integration with additional phonetic databases
- Client-side phonetic generation using rule-based algorithms
- Manual phonetic transcriptions for common complex words
- Text-to-phoneme conversion libraries

## Technology Stack

- **Next.js 14**: React framework for server-side rendering and routing
- **React 18**: Component-based UI library
- **Tailwind CSS 3**: Utility-first CSS framework for styling
- **Free Dictionary API**: External API for phonetic transcriptions
- **Custom CSS Animations**: Smooth transitions and interactive effects

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

The development server will start at `http://localhost:3000` with hot-reload enabled.


## How It Works

### Morpheme Analysis Algorithm:
1. Checks for known prefixes at the beginning of the word
2. Checks for known suffixes at the end of the word
3. Identifies the remaining portion as the root morpheme
4. Classifies each morpheme by type and provides linguistic information

### Phonetics Fetching Process:
1. Sends word to Free Dictionary API
2. Parses response for IPA transcription in multiple possible fields
3. If unavailable, attempts to fetch root word phonetics
4. Displays result with appropriate labeling and context

## Project Structure

```
morpheme-analyzer/
├── app/
│   ├── page.js           # Main React component with analysis logic
│   ├── layout.js         # Root layout wrapper
│   └── globals.css       # Global styles and animations
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── README.md            # This file
```

## Contributing

Suggestions for improvements are welcome! Potential areas for enhancement:
- Expanded morpheme database
- Alternative phonetic data sources
- Audio pronunciation features
- Etymology information
- Multiple language support

## Author
Varnika Kalani
Created for LX 250: Introduction to Linguistics
Boston University, Fall 2025

## License

Educational use only.
