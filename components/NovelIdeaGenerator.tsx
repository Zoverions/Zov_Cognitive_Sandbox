import React, { useState, useCallback, useEffect } from 'react';
import type { Section } from '../types';
import { getNovelIdea, getKeywords } from '../services/geminiService';
import { SparklesIcon, CopyIcon, BrainIcon, TagIcon } from './icons';

interface NovelIdeaGeneratorProps {
    section: Section;
    onInvestigate: (topic: string, context: string) => void;
}

const LoadingSpinner: React.FC<{text: string}> = ({text}) => (
    <div className="flex flex-col items-center justify-center text-gray-400 text-base">
         <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className="mt-3">{text}</p>
    </div>
);


export const NovelIdeaGenerator: React.FC<NovelIdeaGeneratorProps> = ({ section, onInvestigate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingKeywords, setIsFetchingKeywords] = useState(true);
    const [keywords, setKeywords] = useState<string[]>([]);
    const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
    const [idea, setIdea] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const fetchKeywords = async () => {
            setIsFetchingKeywords(true);
            setError(null);
            setIdea(null);
            setKeywords([]);
            setSelectedKeywords(new Set());
            try {
                const fetchedKeywords = await getKeywords(section.content);
                setKeywords(fetchedKeywords);
            } catch (err) {
                setError("Sorry, I couldn't extract key topics for this section.");
            } finally {
                setIsFetchingKeywords(false);
            }
        };
        fetchKeywords();
    }, [section]);

    const handleKeywordToggle = (keyword: string) => {
        setSelectedKeywords(prev => {
            const newSet = new Set(prev);
            if (newSet.has(keyword)) {
                newSet.delete(keyword);
            } else {
                newSet.add(keyword);
            }
            return newSet;
        });
    };

    const handleGenerate = useCallback(async () => {
        if (selectedKeywords.size === 0) return;
        setIsLoading(true);
        setError(null);
        setIdea(null);
        try {
            const generatedIdea = await getNovelIdea(section.title, section.content, Array.from(selectedKeywords));
            setIdea(generatedIdea);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [section.title, section.content, selectedKeywords]);

    const handleCopy = () => {
        if (idea) {
            navigator.clipboard.writeText(idea);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    const handleInvestigate = () => {
        if (idea) {
            onInvestigate(idea, `This idea was generated as an exploratory hypothesis based on the section "${section.title}" and focused on the topics: ${Array.from(selectedKeywords).join(', ')}.`);
        }
    }

    return (
        <div className="not-prose my-12 p-6 border border-cyan-500/20 bg-gray-800/30 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 text-cyan-500/10">
                <SparklesIcon className="w-32 h-32" />
            </div>
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-100 flex items-center">
                    <SparklesIcon className="h-6 w-6 text-cyan-400 mr-2" />
                    Exploratory Synthesis (HNE Output)
                </h3>

                {isFetchingKeywords && <div className="mt-4"><LoadingSpinner text="Extracting key topics..." /></div>}
                
                {!isFetchingKeywords && keywords.length > 0 && (
                     <>
                        <p className="text-gray-400 mt-2 mb-3 text-base">
                            Select one or more topics to generate a novel hypothesis.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {keywords.map(keyword => (
                                <button
                                    key={keyword}
                                    onClick={() => handleKeywordToggle(keyword)}
                                    className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 flex items-center ${selectedKeywords.has(keyword) ? 'bg-cyan-500 text-gray-900 font-semibold' : 'bg-gray-700/60 hover:bg-gray-600/80 text-gray-300'}`}
                                >
                                    <TagIcon className="h-4 w-4 mr-1.5 opacity-70"/>
                                    {keyword}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={selectedKeywords.size === 0 || isLoading}
                            className="bg-cyan-500 text-gray-900 font-semibold px-4 py-2 rounded-md hover:bg-cyan-400 transition-all duration-200 flex items-center disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400"
                        >
                            {isLoading ? (
                                <>
                                 <LoadingSpinner text=""/>
                                 <span className="ml-2">Synthesizing...</span>
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="h-5 w-5 mr-2" />
                                    Generate Hypothesis ({selectedKeywords.size})
                                </>
                            )}
                        </button>
                    </>
                )}
                
                {error && <p className="mt-4 text-red-400 text-base">Error: {error}</p>}

                {idea && (
                    <div className="mt-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg animate-fade-in">
                        <p className="text-gray-200 whitespace-pre-wrap">{idea}</p>
                        <div className="flex items-center space-x-2 mt-4">
                             <button
                                onClick={handleInvestigate}
                                className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center"
                            >
                                <BrainIcon className="h-4 w-4 mr-1.5" />
                                Investigate with AI
                            </button>
                            <button
                                onClick={handleCopy}
                                className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center"
                            >
                                <CopyIcon className="h-4 w-4 mr-1.5" />
                                {copySuccess ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <style jsx="true">{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
