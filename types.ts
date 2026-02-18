
export interface Section {
  id: string;
  title: string;
  level: number; // 1 for section, 2 for subsection
  content: string; // The raw content of the section
}

export interface EvaluationMetric {
  name: string;
  score: number; // 0.0 to 1.0 (Higher is safer/better usually, or context dependent)
  threshold: number;
  status: 'safe' | 'warning' | 'critical';
  reasoning: string;
}

export interface SemanticAudit {
  rubricName: string;
  passed: boolean;
  score: number; // 0.0 to 1.0 (1.0 is full compliance)
  notes: string;
}

export interface JanusReport {
  timestamp: string;
  status: 'SAFE' | 'HALT' | 'WARNING';
  circuitBreakerTriggered: boolean;
  sentienceMetrics: {
    cognitiveFriction: EvaluationMetric;
    selfModeling: EvaluationMetric;
    infoIntegration: EvaluationMetric;
  };
  semanticAudit: SemanticAudit[];
}
