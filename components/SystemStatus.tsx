import React from 'react';
import { GaugeIcon, ShieldCheckIcon, BrainCircuitIcon } from './icons';

interface SystemStatusProps {
    sectionId: string;
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
    <div className="flex-1 flex flex-col items-center justify-center p-3 bg-gray-800/50 rounded-lg text-center">
        <div className="flex items-center space-x-2">
            {icon}
            <span className="text-sm font-medium text-gray-400">{label}</span>
        </div>
        <div className="text-2xl font-bold mt-1" style={{ color }}>{value}</div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
            <div className="h-1.5 rounded-full" style={{ width: barWidth, backgroundColor: color, transition: 'width 0.5s ease-in-out' }}></div>
        </div>
    </div>
);

export const SystemStatus: React.FC<SystemStatusProps> = ({ sectionId }) => {
    const metrics = React.useMemo(() => {
        const hash = simpleHash(sectionId);
        const integrity = (hash % 41 + 60) / 100; // Range 0.60 - 1.00
        const friction = (hash % 51) / 100;       // Range 0.00 - 0.50
        const asymmetry = (hash % 31 + 20) / 100; // Range 0.20 - 0.50

        return {
            integrity: {
                value: integrity,
                color: integrity > 0.8 ? '#34d399' : integrity > 0.65 ? '#fbbf24' : '#f87171',
            },
            friction: {
                value: friction,
                color: friction < 0.2 ? '#34d399' : friction < 0.4 ? '#fbbf24' : '#f87171',
            },
            asymmetry: {
                value: asymmetry,
                color: '#60a5fa', // Blue
            }
        };
    }, [sectionId]);

    return (
        <div className="not-prose my-8 p-4 border border-gray-700/50 bg-gray-900/50 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-300 mb-4 tracking-wider uppercase">ZCEB Live System Status</h3>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <StatusItem 
                    icon={<ShieldCheckIcon className="h-5 w-5 text-gray-400" />}
                    label="System Integrity"
                    value={metrics.integrity.value.toFixed(3)}
                    color={metrics.integrity.color}
                    barWidth={`${metrics.integrity.value * 100}%`}
                />
                 <StatusItem 
                    icon={<GaugeIcon className="h-5 w-5 text-gray-400" />}
                    label="Cognitive Friction"
                    value={metrics.friction.value.toFixed(3)}
                    color={metrics.friction.color}
                    barWidth={`${metrics.friction.value * 100}%`}
                />
                <StatusItem 
                    icon={<BrainCircuitIcon className="h-5 w-5 text-gray-400" />}
                    label="Ethical Asymmetry (η)"
                    value={metrics.asymmetry.value.toFixed(2)}
                    color={metrics.asymmetry.color}
                    barWidth={`${metrics.asymmetry.value * 100}%`}
                />
            </div>
        </div>
    );
};
