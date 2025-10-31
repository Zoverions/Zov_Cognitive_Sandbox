
import type { Section } from '../types';

function cleanTitle(title: string): string {
    return title.replace(/\\textbf\{(.+?)\}/g, '$1').replace(/\\/g, '');
}

export function parseDocument(rawText: string): Section[] {
    const sections: Section[] = [];
    
    // Abstract
    const abstractMatch = rawText.match(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/);
    if (abstractMatch) {
        sections.push({
            id: 'abstract',
            title: 'Abstract',
            level: 1,
            content: abstractMatch[1].trim(),
        });
    }

    const sectionBlocks = rawText.split('\\section{');

    for (let i = 1; i < sectionBlocks.length; i++) {
        const block = sectionBlocks[i];
        const endOfTitle = block.indexOf('}');
        const sectionTitle = cleanTitle(block.substring(0, endOfTitle));
        const sectionId = sectionTitle.toLowerCase().replace(/\s+/g, '-');
        
        const contentAndSubsections = block.substring(endOfTitle + 1);
        const subsectionBlocks = contentAndSubsections.split('\\subsection{');

        // Content before the first subsection
        let fullSectionContent = subsectionBlocks[0].trim();

        // Append subsections to the parent's content
        for (let j = 1; j < subsectionBlocks.length; j++) {
            const subBlock = subsectionBlocks[j];
            const endOfSubTitle = subBlock.indexOf('}');
            const subTitle = cleanTitle(subBlock.substring(0, endOfSubTitle));

            // Re-add subsection title to the content
            fullSectionContent += `\n\n\\subsection{${subTitle}}\n` + subBlock.substring(endOfSubTitle + 1).trim();
        }

        sections.push({
            id: sectionId,
            title: sectionTitle,
            level: 1,
            content: fullSectionContent,
        });
    }

    return sections;
}
