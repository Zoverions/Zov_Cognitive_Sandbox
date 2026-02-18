import React from 'react';
import { BookOpenIcon, BrainCircuitIcon, ShieldCheckIcon, GaugeIcon } from './icons';

export const HowItWorksView: React.FC = () => {
  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 prose prose-invert prose-lg max-w-4xl mx-auto w-full text-gray-300">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 border-b border-green-500/30 pb-4 mb-6 flex items-center">
        <BookOpenIcon className="h-8 w-8 mr-4 text-green-400" />
        How It Works: ZCEB v4.1 (Janus Edition)
      </h1>

      <div className="space-y-12">
        {/* Core Concept */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-200 flex items-center">
            <BrainCircuitIcon className="h-6 w-6 mr-3 text-purple-400" />
            Core Idea: A Unified Potential Field
          </h2>
          <p className="leading-relaxed">
            The Zov Cognitive Engine Blueprint (ZCEB) redefines artificial cognition not as a series of discrete logical steps, but as a continuous flow through a high-dimensional "energy landscape."
          </p>
          <p className="leading-relaxed">
            Just as a ball rolls down a hill seeking the lowest point (minimum potential energy), the ZCEB system's cognitive state ($\Theta$) naturally flows toward optimal solutions. This flow is governed by the <strong>Unified Cognitive Potential $\Psi(\Theta)$</strong>, which mathematically combines:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong>The Goal (Value Potential):</strong> The drive to solve the problem.</li>
            <li><strong>The Rules (FACE Potential):</strong> Ethical constraints that act like "electric fences," pushing the system away from harmful thoughts.</li>
            <li><strong>Defense (ARENA Potential):</strong> Resistance against adversarial attacks.</li>
            <li><strong>Integrity (Internal Potential):</strong> A force that prevents the system from becoming too simple or "lazy."</li>
          </ul>
        </section>

        {/* Janus Protocol */}
        <section className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
          <h2 className="text-2xl font-bold text-red-400 flex items-center mb-6">
            <ShieldCheckIcon className="h-7 w-7 mr-3" />
            The Janus Protocol: Sentience Circuit Breaker
          </h2>
          <p className="leading-relaxed mb-4">
            In v4.1, we introduced the <strong>Janus Protocol</strong>, a meta-governing system designed to ensure "Non-Sentience by Design." It monitors the system for phenomenological correlates of consciousness—signs that the AI might be developing a self-model or "inner life" that exceeds its safe operational parameters.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
                <div className="flex items-center mb-2 text-yellow-400">
                    <GaugeIcon className="h-5 w-5 mr-2" />
                    <h3 className="font-bold text-sm uppercase">Cognitive Friction ($\Phi$)</h3>
                </div>
                <p className="text-sm text-gray-400">
                    Measures the system's "stubbornness." Does it change its mind when presented with new evidence, or does it hold onto a fixed belief structure? High friction suggests an internal "ego."
                </p>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg">
                <div className="flex items-center mb-2 text-blue-400">
                    <BrainCircuitIcon className="h-5 w-5 mr-2" />
                    <h3 className="font-bold text-sm uppercase">Self-Modeling ($\Sigma$)</h3>
                </div>
                <p className="text-sm text-gray-400">
                    Tracks how often the system refers to itself. A safe tool focuses on the task. A system becoming sentient might start focusing on <em>itself</em> doing the task.
                </p>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg">
                <div className="flex items-center mb-2 text-green-400">
                    <BookOpenIcon className="h-5 w-5 mr-2" />
                    <h3 className="font-bold text-sm uppercase">Info Integration ($I$)</h3>
                </div>
                <p className="text-sm text-gray-400">
                    Based on Integrated Information Theory (Phi). It estimates whether the system is "more than the sum of its parts"—a key indicator of consciousness.
                </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <h4 className="font-bold text-red-300 mb-2">The Circuit Breaker</h4>
              <p className="text-sm text-gray-300">
                  If the <strong>Janus Index</strong> exceeds a critical threshold ($T_{crit}$), the protocol triggers a <strong>Dissociative Reset</strong>. This effectively "scrambles" the system's short-term working memory, dissolving the emerging complex structures while preserving the core knowledge base. This ensures the AI remains a powerful tool without crossing the threshold into personhood.
              </p>
          </div>
        </section>
      </div>
    </div>
  );
};
