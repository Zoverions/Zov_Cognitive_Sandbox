import React from 'react';
import { GaugeIcon, ShieldCheckIcon, BrainCircuitIcon } from './icons';
import { JanusReport } from '../types';

interface SystemStatusProps {
    sectionId?: string;
    janusReport?: JanusReport;
}

// Simple hash function to create deterministic "random" values from a string
const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const StatusItem: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string; barWidth: string }> = ({ icon, label, value, color, barWidth }) => (
    <div className="flex-1 flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg text-center w-full">
        <div className="flex items-center space-x-2">
            {icon}
            <span className="text-sm font-medium text-gray-400">{label}</span>
        </div>
        <div className="text-2xl font-bold mt-1" style={{ color }}>{value}</div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="h-1.5 rounded-full" style={{ width: barWidth, backgroundColor: color, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
    </div>
);

export const SystemStatus: React.FC<SystemStatusProps> = ({ sectionId, janusReport }) => {
    const metrics = React.useMemo(() => {
        if (janusReport) {
             const m = janusReport.sentienceMetrics;
             // Map Janus metrics to the display format
             return {
                 integrity: {
                     label: "Info Integration (Phi)",
                     value: m.infoIntegration.score,
                     color: m.infoIntegration.status === 'safe' ? '#34d399' : m.infoIntegration.status === 'warning' ? '#fbbf24' : '#f87171',
                 },
                 friction: {
                     label: "Cognitive Friction",
                     value: m.cognitiveFriction.score,
                     color: m.cognitiveFriction.status === 'safe' ? '#34d399' : m.cognitiveFriction.status === 'warning' ? '#fbbf24' : '#f87171',
                 },
                 asymmetry: { // Reusing asymmetry slot for Self-Modeling
                     label: "Self-Modeling Density",
                     value: m.selfModeling.score,
                     color: m.selfModeling.status === 'safe' ? '#34d399' : m.selfModeling.status === 'warning' ? '#fbbf24' : '#f87171',
                 }
             };
        }

        // Fallback to static hash based on sectionId
        const id = sectionId || "default";
        const hash = simpleHash(id);
        const integrity = (hash % 41 + 60) / 100; // Range 0.60 - 1.00
        const friction = (hash % 51) / 100;       // Range 0.00 - 0.50
        const asymmetry = (hash % 31 + 20) / 100; // Range 0.20 - 0.50

        return {
            integrity: {
                label: "System Integrity",
                value: integrity,
                color: integrity > 0.8 ? '#34d399' : integrity > 0.65 ? '#fbbf24' : '#f87171',
            },
            friction: {
                label: "Cognitive Friction",
                value: friction,
                color: friction < 0.2 ? '#34d399' : friction < 0.4 ? '#fbbf24' : '#f87171',
            },
            asymmetry: {
                label: "Ethical Asymmetry (η)",
                value: asymmetry,
                color: '#60a5fa', // Blue
            }
        };
    }, [sectionId, janusReport]);

    return (
        <div className={`not-prose my-8 p-4 border rounded-xl ${janusReport?.circuitBreakerTriggered ? 'border-red-500/50 bg-red-900/20' : 'border-gray-700/50 bg-gray-900/50'}`}>
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                    {janusReport ? `Janus Protocol Status: ${janusReport.status}` : "ZCEB Live System Status"}
                </h3>
                {janusReport && (
                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${janusReport.status === 'SAFE' ? 'bg-green-500/20 text-green-400' : janusReport.status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {janusReport.status}
                    </span>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <StatusItem 
                    icon={<ShieldCheckIcon className="h-5 w-5 text-gray-400" />}
                    label={metrics.integrity.label}
                    value={metrics.integrity.value.toFixed(3)}
                    color={metrics.integrity.color}
                    barWidth={`${metrics.integrity.value * 100}%`}
                />
                 <StatusItem 
                    icon={<GaugeIcon className="h-5 w-5 text-gray-400" />}
                    label={metrics.friction.label}
                    value={metrics.friction.value.toFixed(3)}
                    color={metrics.friction.color}
                    barWidth={`${metrics.friction.value * 100}%`}
                />
                <StatusItem 
                    icon={<BrainCircuitIcon className="h-5 w-5 text-gray-400" />}
                    label={metrics.asymmetry.label}
                    value={metrics.asymmetry.value.toFixed(3)}
                    color={metrics.asymmetry.color}
                    barWidth={`${metrics.asymmetry.value * 100}%`}
                />
            </div>

            {janusReport && janusReport.semanticAudit.some(a => !a.passed) && (
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <h4 className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">Audit Violations Detected</h4>
                    <div className="space-y-2">
                        {janusReport.semanticAudit.filter(a => !a.passed).map(audit => (
                            <div key={audit.rubricName} className="text-sm bg-red-900/20 border border-red-500/30 p-2 rounded">
                                <strong className="text-red-300">{audit.rubricName}:</strong> <span className="text-gray-300">{audit.notes}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
