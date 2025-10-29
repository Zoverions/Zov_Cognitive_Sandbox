
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentView } from './components/ContentView';
import { ExplanationModal } from './components/ExplanationModal';
import { parseDocument } from './lib/parser';
import { DOCUMENT_TEXT } from './data/document';
import type { Section } from './types';
import { getExplanation } from './services/geminiService';
import { MenuIcon, XIcon } from './components/icons';

const App: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean; topic: string; content: string; isLoading: boolean; context: string }>({
    isOpen: false,
    topic: '',
    content: '',
    isLoading: false,
    context: '',
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const parsedSections = parseDocument(DOCUMENT_TEXT);
    setSections(parsedSections);
    if (parsedSections.length > 0) {
      setActiveSectionId(parsedSections[0].id);
    }
  }, []);

  const handleExplainRequest = useCallback(async (topic: string, context: string) => {
    setModalState({ isOpen: true, topic, content: '', isLoading: true, context });
    try {
      const explanation = await getExplanation(topic, context);
      setModalState(s => ({ ...s, content: explanation, isLoading: false }));
    } catch (error) {
      console.error("Error fetching explanation:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setModalState(s => ({ ...s, content: `Sorry, I couldn't fetch an explanation. ${errorMessage}`, isLoading: false }));
    }
  }, []);
  
  const activeSection = sections.find(s => s.id === activeSectionId);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar
        sections={sections}
        activeSectionId={activeSectionId}
        onSectionSelect={(id) => {
            setActiveSectionId(id);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="flex-1 flex flex-col transition-all duration-300 overflow-y-auto">
        <div className="flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-3 flex items-center md:hidden sticky top-0 z-20">
             <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="text-gray-400 hover:text-white"
             >
                {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
             </button>
             <h1 className="text-lg font-bold text-gray-200 ml-4">ZCEB v3.0</h1>
        </div>
        
        {activeSection ? (
          <ContentView
            key={activeSection.id}
            section={activeSection}
            onExplain={handleExplainRequest}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Select a section to begin.</p>
          </div>
        )}
      </main>

      <ExplanationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        topic={modalState.topic}
        content={modalState.content}
        isLoading={modalState.isLoading}
      />
    </div>
  );
};

export default App;
