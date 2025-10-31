
import React from 'react';
import { BookOpenIcon, BrainCircuitIcon } from './icons';

export const HowItWorksView: React.FC = () => {
  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 prose prose-invert prose-lg max-w-4xl mx-auto w-full text-gray-300">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 border-b border-green-500/30 pb-4 mb-6 flex items-center">
        <BookOpenIcon className="h-8 w-8 mr-4 text-green-400" />
        How It Works: The ZCEB Framework
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-200 flex items-center">
            <BrainCircuitIcon className="h-6 w-6 mr-3 text-purple-400" />
            Core Idea: A Unified Potential Field
          </h2>
          <p className="leading-relaxed">
            Placeholder content explaining the Unified Cognitive Potential Ψ(Θ).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-200">The "Energy Landscape" of Thought</h2>
          <p className="leading-relaxed">
            Placeholder content explaining the component potentials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-200">The Janus Protocol: A Sentience Circuit Breaker</h2>
          <p className="leading-relaxed">
            Placeholder content explaining the Janus Protocol.
          </p>
        </section>
      </div>
    </div>
  );
};
