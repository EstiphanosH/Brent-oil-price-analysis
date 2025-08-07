# 📌 Assumptions and Limitations  
_Integrated Framework for Brent Oil Change Point Analysis_

---

## 🔍 Core Assumptions Framework

### 🧾 Data Quality Assumptions

| Assumption | Validation Approach | Risk Level | Mitigation |
|------------|---------------------|------------|------------|
| Brent price accuracy within ±0.5% tolerance | Triangulation with EIA, Bloomberg, and ICE benchmarks | Low | Discrepancy flagging system |
| Complete time series without artificial gaps | Sequential date validation with outlier detection | Medium | Linear interpolation for minor gaps (<3 days) |
| Event chronology precision | Primary source verification (Reuters/OPEC timestamps) | High | Confidence-weighted event scoring |

---

### 📐 Methodological Assumptions

| Assumption | Statistical Test | Verification Threshold | Mitigation |
|------------|------------------|-------------------------|------------|
| Log-return stationarity | ADF (p<0.01), KPSS (α=0.05) | Reject if either test fails | Apply differencing |
| Structural break validity | Bayes Factor > 3 + Granger causality p < 0.05 | Exclude if both fail | Annotate as "non-event" |
| 30-day event window relevance | ARCH-LM test for volatility clusters | Varies by event | Tune window: 15–60 days |

---

## ⚠️ Critical Limitations

### 1. 🎯 Causal Attribution

Change points represent **statistical discontinuities**, not definitive causal relationships.

**Validation Triad**:
- ✅ Temporal precedence
- ✅ Competing hypothesis testing
- ✅ News sentiment correlation (e.g., via LexisNexis API)

---

### 2. 🔄 Multivariate Confounding

Real-world price changes stem from multiple economic drivers:

**Documented Confounders**:
- Federal Reserve policy signals
- OECD petroleum inventory levels
- Futures market positioning (CFTC COT reports)

**Mitigation**:
- Use a **hierarchical Bayesian model** with macroeconomic covariates and random effects.

---

### 3. 🧮 Model Specification Risks

**Constraints**:
- Assumes single-regime volatility
- Gaussian error terms

**Enhancements Planned**:
- ➕ Markov-switching GARCH (Q2 2024)
- ➕ Bayesian model averaging (BMA) to address uncertainty in break dates

---

## 🧠 Causal Inference Framework

```mermaid
graph TD
    A[Statistical Change Point] -->|Temporal Alignment| B(Confirmed Event)
    B --> C[Price Movement Δ > 5%]
    D[Macroeconomic Factors] -.-> C
    E[Market Sentiment] -.-> C
    style A stroke:#0066cc,stroke-width:2px
    style B stroke:#00aa44,stroke-width:2.5px
