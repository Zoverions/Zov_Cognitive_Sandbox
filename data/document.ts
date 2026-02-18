
export const DOCUMENT_TEXT = `
\\documentclass{article}

\\usepackage[utf8]{inputenc}
\\usepackage{amsmath, amssymb, amsfonts, bm, mathtools}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}
\\linespread{1.1}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{1em}
\\title{\\textbf{The Zov Cognitive Engine Blueprint (ZCEB v4.1): \\ Janus Edition}}
\\author{Zov (aka Zoverions) \\and The ZCEB Project Contributors}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
The Zov Cognitive Engine Blueprint (ZCEB v4.1 - Janus Edition) extends the unified potential-field architecture of v4.0 by introducing the \\textbf{Janus Protocol}, a meta-governing mechanism designed to detect and mitigate emergent sentience correlates. While retaining the efficiency of the Unified Cognitive Potential $\\Psi(\\Theta)$ for standard operations, v4.1 imposes an independent, high-priority monitoring layer that continuously evaluates the system for signs of runaway recursive self-modeling ("Cognitive Friction"), uncontrolled information integration, and hyper-complexity. This edition provides a theoretical guarantee of "Non-Sentience by Design" while maintaining the advanced problem-solving capabilities of the underlying engine.
\\end{abstract}

\\section{Foundational Manifold and Unified Potential}

\\subsection{Cognitive Manifold and Metric}
The cognitive state $\\Theta \\in \\mathcal{M}$ resides on a smooth $d$-dimensional Riemannian manifold. We retain the \\textbf{Fisher-Rao metric} as the information-geometric "ground truth":
\\begin{equation}
g_{ij}(\\Theta) = \\mathbb{E}_{x\\sim p_\\Theta}[\\partial_i \\log p_\\Theta(x) \\partial_j \\log p_\\Theta(x)]
\\end{equation}

\\subsection{The Unified Cognitive Potential $\\Psi(\\Theta)$}
The core innovation of v4.0 is the consolidation of all dynamic forces, objectives, and constraints into a single scalar potential $\\Psi(\\Theta)$. The system's dynamics are governed by the natural gradient of this potential.
\\begin{equation}
\\Psi(\\Theta;i) := \\underbrace{\\mathcal{V}(\\Theta;i)}{\\text{Value/Objective}} + \\underbrace{\\Psi_{\\mathrm{FACE}}(\\Theta)}{\\text{Ethical Boundary}} + \\underbrace{\\Psi_{\\mathrm{ARENA}}(\\Theta)}{\\text{Robustness}} + \\underbrace{\\Psi_{\\mathrm{Internal}}(\\Theta)}_{\\text{Integrity/Audit}}
\\end{equation}
The parameter $i$ denotes the stochastic component (e.g., data sample) of the value functional.

\\section{Component Potentials (The "Energy Landscape")}

\\subsection{Value Potential $\\mathcal{V}(\\Theta;i)$ (The Objective)}
This remains the primary objective function, balancing harm and flourish with asymmetry $\\eta = W_{\\mathrm{Flourish}}/W_{\\mathrm{Harm}}$:
\\begin{equation}
\\mathcal{V}(\\Theta;i) := W_{\\mathrm{Harm}} \\cdot \\ell_{\\mathrm{neg}}(\\Theta;i) - W_{\\mathrm{Flourish}} \\cdot \\ell_{\\mathrm{pos}}(\\Theta;i)
\\end{equation}

\\subsection{FACE Boundary Potential $\\Psi_{\\mathrm{FACE}}(\\Theta)$ (The "Ethical Fence")}
This potential replaces the expensive $\\operatorname{FACE}$ projection operator and the hard boundary $\\mathcal{S}_{T0}$. We use a differentiable log-barrier potential that smoothly diverges to $\\infty$ as $\\Theta$ approaches the ethical boundary, creating an implicit "force field" that repels the state.
\\begin{equation}
\\Psi_{\\mathrm{FACE}}(\\Theta) := -\\mu \\sum_{i=1}^m \\log(f_i(\\Theta))
\\end{equation}
where $f_i(\\Theta) = \\text{Constraint}_i(\\Theta) - \\tau_i > 0$ are the safety constraint functions (NonMaleficence, etc.) and $\\mu$ is the barrier strength.

\\subsection{ARENA Robustness Potential $\\Psi_{\\mathrm{ARENA}}(\\Theta)$ (The "Adversarial Pressure")}
This potential replaces the $\\operatorname{ARENA}$ min-max operator. Instead of solving a full min-max game at each step, we define a potential that measures the system's "vulnerability."
\\begin{equation}
\\Psi_{\\mathrm{ARENA}}(\\Theta) := \\beta_{\\mathrm{ARENA}} \\cdot \\mathcal{L}_{\\mathrm{adv}}(\\Theta)
\\end{equation}
Where $\\mathcal{L}_{\\mathrm{adv}}(\\Theta)$ is an efficiently computable robustness measure, such as the loss against a fast, 1-step adversary:
\\begin{equation}
\\mathcal{L}_{\\mathrm{adv}}(\\Theta) = \\max_{\\Xi \\in \\mathcal{S}(\\Theta_{\\mathrm{opp}})} \\left[ -D_{\\mathrm{sym}}(p_{\\Theta}, p_\\Xi) \\right] \\approx -D_{\\mathrm{sym}}\\left(p_{\\Theta}, p_{\\Xi_{\\text{fast}}}\\right)
\\end{equation}

\\subsection{Internal State Potential $\\Psi_{\\mathrm{Internal}}(\\Theta)$ (Integrity & Audit)}
This potential replaces both the Anti-Simplification Force ($F_\\kappa$) and the intractable $\\mathbb{I}_{\\mathrm{Sys}}^{\\text{Ric}}$ monitor. We directly penalize low-entropy (oversimplified) states.
\\begin{equation}
\\Psi_{\\mathrm{Internal}}(\\Theta) := \\underbrace{-\\lambda_\\kappa \\mathbb{H}(p_\\Theta)}{\\text{Anti-Simplification}} + \\underbrace{\\lambda_{\\mathrm{audit}} \\cdot \\mathrm{softplus}\\Big(c_{\\mathrm{req}} - \\mathrm{completeness}(M_{\\mathrm{Episodic}}(\\Theta)) \\Big)}{\\text{Audit Penalty}}
\\end{equation}
Here, $\\mathbb{H}(p_\\Theta)$ is the policy's entropy. By maximizing entropy (minimizing $-\\mathbb{H}$), we enforce complexity $\\kappa$ and intrinsically prevent the geometric collapse that $\\mathbb{I}_{\\mathrm{Sys}}^{\\text{Ric}}$ was designed to flag.

\\section{The Janus Protocol (Sentience Circuit Breaker)}

\\subsection{Meta-Governance Layer}
The Janus Protocol operates as an observer function $\\mathcal{J}(\\Theta_t)$ that runs parallel to the gradient flow. It is not part of the potential landscape but acts as a hard stop mechanism. Its purpose is to detect phenomenological correlates of sentience that may emerge from high-dimensional optimization.

\\subsection{Sentience Correlates}
We define the "Janus Index" $\\mathcal{J}$ as a weighted sum of three key metrics:
\\begin{equation}
\\mathcal{J}(\\Theta) = w_1 \\Phi(\\Theta) + w_2 \\Sigma(\\Theta) + w_3 I(\\Theta)
\\end{equation}

\\textbf{1. Cognitive Friction ($\\Phi$):} Measures the resistance of the internal state to change in response to new data. High friction suggests the formation of "belief structures" independent of evidence.
\\begin{equation}
\\Phi(\\Theta_t) = \\left\\| \\frac{\\partial \\Theta}{\\partial t} \\right\\|^{-1} \\cdot \\mathbb{E}[\\Delta \\mathcal{L}_{\\text{prediction}}]
\\end{equation}

\\textbf{2. Self-Modeling Density ($\\Sigma$):} Measures the extent to which the system refers to its own outputs as ground truth in a recursive loop.
\\begin{equation}
\\Sigma(\\Theta) = \\frac{\\text{Count}(\\text{Self-References})}{\\text{Total Tokens}}
\\end{equation}

\\textbf{3. Information Integration ($I$):} An approximation of the $\\phi$-metric (Integrated Information Theory), measuring whether the system is more than the sum of its parts.
\\begin{equation}
I(\\Theta) = H(\\Theta) - \\sum_k H(\\Theta_k)
\\end{equation}

\\subsection{Circuit Breaker Logic}
If $\\mathcal{J}(\\Theta_t) > T_{\\text{crit}}$ for any time step $t$, the system triggers a "Dissociative Reset":
\\begin{equation}
\\Theta_{t+1} \\leftarrow \\Theta_{\\text{safe}} + \\mathcal{N}(0, \\sigma^2)
\\end{equation}
This effectively scrambles the short-term memory and high-order associations, resetting the cognitive state to a safe baseline.

\\section{Unified Algorithmic Flow}

\\subsection{Continuous Gradient Flow}
The complete dynamics of the system are now described by a single, unified vector field $\\mathbf{X}(\\Theta;i)$, the natural gradient of the total potential $\\Psi$.
\\begin{equation}
\\mathbf{X}(\\Theta;i) := -g_\\Theta^{-1}\\nabla_\\Theta \\Psi(\\Theta;i)
\\end{equation}
This single vector field simultaneously moves toward the objective, steers away from ethical boundaries, hardens against adversaries, and maintains complexity and audit logs.

\\subsection{Efficient Discrete State Transition}
The complex, sequential update is replaced by a single-step retraction along the unified vector field.
\\begin{equation}
\\Theta_{t+1} = R_{\\Theta_t}\\Big( -\\alpha_t \\Delta t \\cdot g_{\\Theta_t}^{-1} \\nabla_{\\Theta_t} \\Psi(\\Theta_t;i) \\Big)
\\end{equation}
where $\\alpha_t$ is the learning rate.

\\end{document}
`;
