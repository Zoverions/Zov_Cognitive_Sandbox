
import React from 'react';
import { BrainCircuitIcon, XIcon } from './icons';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  content: string;
  isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
);

export const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, onClose, topic, content, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-scale 0.3s forwards' }}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-3">
                <BrainCircuitIcon className="h-6 w-6 text-cyan-400" />
                <h2 className="text-lg font-semibold text-gray-100 truncate pr-4">
                    Explain: <span className="text-cyan-400">{topic}</span>
                </h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <XIcon className="h-5 w-5" />
            </button>
        </header>
        <main className="p-6 overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <LoadingSpinner />
                <p className="mt-4">Generating explanation...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-md max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
          )}
        </main>
      </div>
      <style jsx="true">{`
        @keyframes fade-in-scale {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
