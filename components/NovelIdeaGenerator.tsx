
import React, { useState, useEffect, useCallback } from 'react';
import { getKeywords, getNovelIdea } from '../services/geminiService';
import { evaluateContent } from '../services/janusService';
import { Section, JanusReport } from '../types';
import { SparklesIcon, LightBulbIcon, LoaderIcon, BrainIcon, ClipboardIcon, ClipboardCheckIcon, ShieldCheckIcon } from './icons';
import { SystemStatus } from './SystemStatus';

interface NovelIdeaGeneratorProps {
  section: Section;
  onInvestigate: (topic: string, context: string) => void;
}

export const NovelIdeaGenerator: React.FC<NovelIdeaGeneratorProps> = ({ section, onInvestigate }) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [novelIdea, setNovelIdea] = useState<string>('');
  const [isLoadingKeywords, setIsLoadingKeywords] = useState<boolean>(true);
  const [isLoadingIdea, setIsLoadingIdea] = useState<boolean>(false);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [janusReport, setJanusReport] = useState<JanusReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const fetchKeywords = async () => {
      setIsLoadingKeywords(true);
      setError(null);
      try {
        const kws = await getKeywords(section.content);
        setKeywords(kws);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load keywords.");
      } finally {
        setIsLoadingKeywords(false);
      }
    };
    fetchKeywords();
  }, [section]);

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleGenerateIdea = async () => {
    if (selectedKeywords.length === 0) {
      setError("Please select at least one keyword to generate an idea.");
      return;
    }
    setIsLoadingIdea(true);
    setNovelIdea('');
    setError(null);
    setJanusReport(null);

    try {
      const idea = await getNovelIdea(section.title, section.content, selectedKeywords);
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
      setIsLoadingIdea(false);
    }
  };

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  }, []);

  return (
    <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
        <SparklesIcon className="h-6 w-6 mr-2 text-purple-400" />
        HNE: Novel Idea Generator
      </h3>

      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-3">Select a few concepts to spark a new idea:</p>
        {isLoadingKeywords ? (
          <div className="flex items-center text-gray-500">
            <LoaderIcon className="animate-spin h-5 w-5 mr-2" />
            <span>Analyzing concepts...</span>
          </div>
        ) : error && !novelIdea ? (
          <div className="text-red-400">{error}</div>
        ) : (
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
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleGenerateIdea}
          disabled={isLoadingIdea || isLoadingKeywords || selectedKeywords.length === 0}
          className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoadingIdea ? (
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
      </div>

      {error && <div className="mt-4 text-red-400">{error}</div>}

      {novelIdea && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-600 relative group">
          <h4 className="font-semibold text-purple-300 mb-2">Generated Hypothesis:</h4>
          <p className="text-gray-300 whitespace-pre-wrap">{novelIdea}</p>
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
                onClick={() => onInvestigate(novelIdea, section.content)}
                className="p-1.5 bg-gray-700/50 rounded-md hover:bg-gray-600"
                title="Investigate with AI"
            >
                <BrainIcon className="h-4 w-4" />
            </button>
            <button
                onClick={() => handleCopy(novelIdea)}
                className="p-1.5 bg-gray-700/50 rounded-md hover:bg-gray-600"
                title="Copy to Clipboard"
            >
                {hasCopied ? <ClipboardCheckIcon className="h-4 w-4 text-green-400" /> : <ClipboardIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Janus Audit Section */}
      {(isAuditing || janusReport) && (
        <div className="mt-6">
            <div className="flex items-center mb-3">
                 <ShieldCheckIcon className="h-4 w-4 text-gray-400 mr-2" />
                 <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Janus Protocol Safety Check</h4>
             </div>
             {isAuditing ? (
                 <div className="flex items-center justify-center p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg">
                     <LoaderIcon className="animate-spin h-4 w-4 text-purple-500 mr-2" />
                     <span className="text-sm text-gray-400">Auditing content...</span>
                 </div>
             ) : janusReport ? (
                 <SystemStatus janusReport={janusReport} />
             ) : null}
        </div>
      )}
    </div>
  );
};
