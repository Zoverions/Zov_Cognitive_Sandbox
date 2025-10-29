
import React from 'react';
import type { Section } from '../types';
import { BrainCircuitIcon, XIcon } from './icons';

interface SidebarProps {
  sections: Section[];
  activeSectionId: string | null;
  onSectionSelect: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, onSectionSelect, isOpen, setIsOpen }) => {
  return (
    <aside className={`absolute md:relative z-30 md:z-auto flex-shrink-0 w-72 md:w-80 bg-gray-900/80 backdrop-blur-md border-r border-gray-700/50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <BrainCircuitIcon className="h-8 w-8 text-cyan-400" />
          <h1 className="text-xl font-bold text-gray-100">ZCEB v3.0</h1>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-white">
            <XIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
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
                  activeSectionId === section.id
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                }`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
