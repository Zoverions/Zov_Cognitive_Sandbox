import React from 'react';
import type { Section } from '../types';
import { BrainIcon } from './icons';
import { SystemStatus } from './SystemStatus';
import { NovelIdeaGenerator } from './NovelIdeaGenerator';

declare global {
    interface Window {
        renderMathInElement: (element: HTMLElement, options?: any) => void;
    }
}

interface FrameworkViewProps {
  section: Section;
  onExplain: (topic: string, context: string) => void;
}

const InteractiveText: React.FC<{ text: string, onExplain: (topic: string, context: string) => void }> = ({ text, onExplain }) => {
  if (!text) {
    return null;
  }

  const KEY_TERMS = [
    'Riemannian manifold', 'natural gradient flows', 'FACE', 'ARENA', 'Ricci curvature',
    'Fisher-Rao metric', 'Value Functional', 'geodesic projection', 'Adversarial Robustness',
    'Ethical Boundary Manifold', 'Cognitive Friction', 'exponential map', 'retraction',
    'Robbins-Monro'
  ];
  
  const regex = new RegExp(`(\\b(?:${KEY_TERMS.join('|')})\\b|\\textbf\\{([^}]+?)\\})`, 'gi');
  
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    const fullMatch = match[0];
    const term = fullMatch.replace(/\\textbf\{|\}/g, '');

    elements.push(
      <span
        key={lastIndex}
        className="bg-cyan-500/10 text-cyan-300 px-1 py-0.5 rounded-md cursor-pointer hover:bg-cyan-500/20 transition-colors duration-200 relative group"
        onClick={() => onExplain(term, text)}
      >
        {term}
        <BrainIcon className="h-3 w-3 inline-block ml-1 opacity-60 group-hover:opacity-100" />
      </span>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return <>{elements}</>;
};


export const FrameworkView: React.FC<FrameworkViewProps> = ({ section, onExplain }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!contentRef.current) return;

    const renderAndEnhanceMath = () => {
      if (contentRef.current && window.renderMathInElement) {
        window.renderMathInElement(contentRef.current, {
          delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\(', right: '\\)', display: false},
              {left: '\\[', right: '\\]', display: true},
              {left: "\\begin{equation}", right: "\\end{equation}", display: true},
              {left: "\\begin{align}", right: "\\end{align}", display: true},
              {left: "\\begin{align*}", right: "\\end{align*}", display: true},
          ],
          throwOnError: false
        });

        const mathElements = contentRef.current.querySelectorAll('.katex');
        mathElements.forEach(el => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.dataset.interactive) return;
          htmlEl.dataset.interactive = 'true';

          htmlEl.style.cursor = 'pointer';
          htmlEl.classList.add('px-1', 'rounded-md', 'transition-colors', 'duration-200', 'hover:bg-cyan-500/10');
          
          htmlEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const annotation = htmlEl.querySelector('annotation[encoding="application/x-tex"]');
            if (annotation && annotation.textContent) {
              onExplain(annotation.textContent, section.content);
            }
          });
        });
      }
    };

    const timerId = setTimeout(renderAndEnhanceMath, 0);
    
    return () => clearTimeout(timerId);

  }, [section.content, onExplain]);

  const cleanContent = (text: string) => {
    return text
      .replace(/\\documentclass\{.*?\}/g, '')
      .replace(/\\usepackage\{.*?\}/g, '')
      .replace(/\\geometry\{.*?\}/g, '')
      .replace(/\\linespread\{.*?\}/g, '')
      .replace(/\\setlength\{.*?\}/g, '')
      .replace(/\\title\{.*?\}/gs, '')
      .replace(/\\author\{.*?\}/gs, '')
      .replace(/\\date\{.*?\}/g, '')
      .replace(/\\maketitle/g, '')
      .replace(/\\begin\{document\}/g, '')
      .replace(/\\end\{document\}/g, '')
      .replace(/\\subsection\{(.+?)\}/g, '<h3 class="text-2xl font-semibold text-gray-200 mt-8 mb-4">$1</h3>')
      .replace(/\\subsubsection\*\{(.+?)\}/g, '<h4 class="text-lg font-semibold text-gray-300 mt-4 mb-2">$1</h4>')
      .replace(/\\begin\{itemize\}/g, '<ul class="list-disc list-inside space-y-2 my-4 pl-4">')
      .replace(/\\end\{itemize\}/g, '</ul>')
      .replace(/\\item/g, '<li>')
      .replace(/\\begin\{center\}/g, '<div class="flex justify-center my-4">')
      .replace(/\\end\{center\}/g, '</div>')
      .replace(/\\begin\{tabular\}\{.*?\}\s*\\hline([\s\S]*?)\\hline\s*\\end\{tabular\}/g, (match, content) => {
          const rows = content.trim().split('\\\\').map(row => row.trim()).filter(Boolean);
          const header = `<thead><tr class="border-b border-gray-600">${rows[0].split('&').map(cell => `<th class="p-2 text-left font-semibold">${cell.replace(/\\textbf\{|\}/g, '')}</th>`).join('')}</tr></thead>`;
          const body = `<tbody>${rows.slice(1).map(row => `<tr class="border-b border-gray-700">${row.split('&').map(cell => `<td class="p-2">${cell.trim()}</td>`).join('')}</tr>`).join('')}</tbody>`;
          return `<div class="overflow-x-auto"><table class="w-full text-sm my-4 border border-gray-700 rounded-lg">${header}${body}</table></div>`;
      })
  };
  
  const processedContent = cleanContent(section.content);
  
  const paragraphs = processedContent.split(/\n\n+/).filter(p => p.trim() !== '');

  return (
    <div ref={contentRef} className="flex-1 p-6 md:p-10 lg:p-12 prose prose-invert prose-lg max-w-4xl mx-auto w-full text-gray-300">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 border-b border-cyan-500/30 pb-4 mb-6">{section.title}</h1>
      
      <SystemStatus sectionId={section.id} />

      {paragraphs.map((paragraph, index) => (
        paragraph.startsWith('<') ?
        <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} /> :
        <p key={index} className="leading-relaxed">
            <InteractiveText text={paragraph} onExplain={onExplain} />
        </p>
      ))}

      <NovelIdeaGenerator section={section} onInvestigate={onExplain} />
    </div>
  );
};
