
import React from 'react';
import type { Section } from '../types';
import { BrainCircuitIcon, XIcon, BeakerIcon, BookOpenIcon } from './icons';

type ViewMode = 'sandbox' | 'framework';

interface SidebarProps {
    sections: Section[];
    activeSectionId: string | null;
    onSectionSelect: (id: string) => void;
    onViewChange: (mode: ViewMode) => void;
    viewMode: ViewMode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, onSectionSelect, onViewChange, viewMode, isOpen, setIsOpen }) => {
    return (
        <aside className={`absolute md:relative z-30 md:z-auto flex-shrink-0 w-72 md:w-80 bg-gray-900/80 backdrop-blur-md border-r border-gray-700/50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
                <div className="flex items-center space-x-3">
                    <BrainCircuitIcon className="h-8 w-8 text-purple-400" />
                    <h1 className="text-xl font-bold text-gray-100">Zov Sandbox</h1>
                </div>
                <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-white">
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
                <div className="mb-6">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Tools</h3>
                    <ul>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onViewChange('sandbox');
                                }}
                                className={`flex items-center px-3 py-2 my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    viewMode === 'sandbox'
                                        ? 'bg-purple-500/10 text-purple-300 font-semibold'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                                }`}
                            >
                                <BeakerIcon className="h-5 w-5 mr-3" />
                                <span>Cognitive Sandbox</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onViewChange('how-it-works');
                                }}
                                className={`flex items-center px-3 py-2 my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    viewMode === 'how-it-works'
                                        ? 'bg-green-500/10 text-green-300 font-semibold'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                                }`}
                            >
                                <BookOpenIcon className="h-5 w-5 mr-3" />
                                <span>How It Works</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Framework v4.0</h3>
                    <ul>
                        {sections.map((section) => (
                            <li key={section.id} className={`${section.level === 2 ? 'ml-4' : ''}`}>
                                <a
                                    href={`#${section.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onSectionSelect(section.id);
                                    }}
                                    className={`block px-3 py-2 my-1 rounded-md text-sm transition-colors duration-200 ${
                                        viewMode === 'framework' && activeSectionId === section.id
                                            ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                                    }`}
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </aside>
    );
};
