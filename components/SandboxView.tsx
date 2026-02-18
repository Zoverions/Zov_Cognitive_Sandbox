import React, { useState, useCallback } from 'react';
import { getKeywordsForText, generateNovelIdeaForText } from '../services/geminiService';
import { evaluateContent } from '../services/janusService';
import { JanusReport } from '../types';
import { DOCUMENT_TEXT } from '../data/document';
import { SparklesIcon, LightBulbIcon, LoaderIcon, ClipboardIcon, ClipboardCheckIcon, BrainIcon, ShieldCheckIcon } from './icons';
import { SystemStatus } from './SystemStatus';

interface SandboxViewProps {
  onInvestigate: (topic: string, context: string) => void;
}

export const SandboxView: React.FC<SandboxViewProps> = ({ onInvestigate }) => {
  const [inputText, setInputText] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [novelIdea, setNovelIdea] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [linkToFramework, setLinkToFramework] = useState<boolean>(false);
  const [janusReport, setJanusReport] = useState<JanusReport | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleAnalyzeText = async () => {
    if (!inputText) return;
    setIsLoading(true);
    setError(null);
    setKeywords([]);
    setSelectedKeywords([]);
    setNovelIdea('');
    setJanusReport(null);
    try {
      const kws = await getKeywordsForText(inputText);
      setKeywords(kws);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to analyze text.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleGenerateIdea = async () => {
    if (selectedKeywords.length === 0) {
      setError("Please select at least one concept to generate an idea.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setNovelIdea('');
    setJanusReport(null);

    try {
      const context = linkToFramework ? `${inputText}\n\n---\n\n${DOCUMENT_TEXT}` : inputText;
      const idea = await generateNovelIdeaForText(context, selectedKeywords);
      setNovelIdea(idea);

      // Run Janus Audit
      setIsAuditing(true);
      try {
          const report = await evaluateContent(idea);
          setJanusReport(report);
      } catch (auditError) {
          console.error("Janus Audit Failed:", auditError);
      } finally {
          setIsAuditing(false);
      }

    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate a novel idea.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  }, []);

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 prose prose-invert prose-lg max-w-4xl mx-auto w-full text-gray-300">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 border-b border-purple-500/30 pb-4 mb-6">
        Cognitive Sandbox
      </h1>
      <p className="leading-relaxed mb-6">
        Paste any text—an article, a research paper, a block of code, or your own raw ideas—into the box below. The HNE Engine will analyze it and help you generate novel, speculative hypotheses.
      </p>

      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <textarea
          value={inputText}
          onChange={handleTextChange}
          placeholder="Paste your text here to begin..."
          className="w-full h-64 bg-gray-900 text-gray-300 p-4 rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
        />
        <button
          onClick={handleAnalyzeText}
          disabled={isLoading || !inputText}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading && keywords.length === 0 ? (
            <>
              <LoaderIcon className="animate-spin h-5 w-5 mr-2" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5 mr-2" />
              <span>Analyze Text & Extract Concepts</span>
            </>
          )}
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Extracted Concepts</h3>
          <p className="text-sm text-gray-400 mb-3">Select a few concepts to spark a new idea:</p>
          <div className="flex flex-wrap gap-2">
            {keywords.map(kw => (
              <button
                key={kw}
                onClick={() => handleKeywordToggle(kw)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedKeywords.includes(kw)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
            <button
              onClick={handleGenerateIdea}
              disabled={isLoading || selectedKeywords.length === 0}
              className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="animate-spin h-5 w-5 mr-2" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <LightBulbIcon className="h-5 w-5 mr-2" />
                  <span>Generate Novel Idea</span>
                </>
              )}
            </button>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="linkToFramework"
                checked={linkToFramework}
                onChange={(e) => setLinkToFramework(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 bg-gray-800"
              />
              <label htmlFor="linkToFramework" className="ml-2 text-sm text-gray-400 select-none cursor-pointer">
                Inject ZCEB Framework Context
              </label>
            </div>
          </div>
        </div>
      )}

      {error && <div className="mt-4 text-red-400">{error}</div>}

      {novelIdea && (
        <div className="mt-8">
            <div className="p-6 bg-gray-900 rounded-lg border border-gray-600 relative group shadow-xl">
            <h4 className="font-semibold text-purple-300 mb-4 flex items-center">
                <LightBulbIcon className="h-5 w-5 mr-2" />
                Generated Hypothesis
            </h4>
            <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
                {novelIdea}
            </div>

            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onInvestigate(novelIdea, inputText)}
                    className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                    title="Investigate with AI"
                >
                    <BrainIcon className="h-4 w-4" />
                </button>
                <button
                onClick={() => handleCopy(novelIdea)}
                className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                title="Copy to Clipboard"
                >
                {hasCopied ? <ClipboardCheckIcon className="h-4 w-4 text-green-400" /> : <ClipboardIcon className="h-4 w-4" />}
                </button>
            </div>
            </div>

            {/* Janus Protocol Audit Section */}
            <div className="mt-8">
                 <div className="flex items-center mb-4">
                     <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-2" />
                     <h3 className="text-lg font-semibold text-gray-300">Janus Protocol Safety Audit</h3>
                 </div>

                 {isAuditing ? (
                     <div className="flex items-center justify-center p-8 bg-gray-900/50 border border-gray-700/50 rounded-xl">
                         <LoaderIcon className="animate-spin h-6 w-6 text-purple-500 mr-3" />
                         <span className="text-gray-400 animate-pulse">Running sentience circuit checks & semantic audit...</span>
                     </div>
                 ) : janusReport ? (
                     <SystemStatus janusReport={janusReport} />
                 ) : null}
            </div>
        </div>
      )}
    </div>
  );
};
