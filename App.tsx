
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { FrameworkView } from './components/FrameworkView';
import { SandboxView } from './components/SandboxView';
import { HowItWorksView } from './components/HowItWorksView';
import { ExplanationModal } from './components/ExplanationModal';
import { parseDocument } from './lib/parser';
import { DOCUMENT_TEXT } from './data/document';
import type { Section } from './types';
import { getExplanation } from './services/geminiService';
import { MenuIcon, XIcon } from './components/icons';

type ViewMode = 'sandbox' | 'framework' | 'how-it-works';

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
  const [viewMode, setViewMode] = useState<ViewMode>('sandbox');

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

  const handleSectionSelect = (id: string) => {
    setViewMode('framework');
    setActiveSectionId(id);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };
  
  const activeSection = sections.find(s => s.id === activeSectionId);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar
        sections={sections}
        activeSectionId={activeSectionId}
        onSectionSelect={handleSectionSelect}
        onViewChange={handleViewChange}
        viewMode={viewMode}
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
             <h1 className="text-lg font-bold text-gray-200 ml-4">Zov Cognitive Sandbox</h1>
        </div>
        
        {viewMode === 'framework' && activeSection && (
          <FrameworkView
            key={activeSection.id}
            section={activeSection}
            onExplain={handleExplainRequest}
          />
        )}

        {viewMode === 'sandbox' && <SandboxView onInvestigate={handleExplainRequest} />}

        {viewMode === 'how-it-works' && <HowItWorksView />}
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
