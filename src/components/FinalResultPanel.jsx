import { useState, useEffect } from "react";

function FinalResultPanel({
  resetTrigger,
  activateInfoPanel,
  reset,
  calculate,
  totalTime,
  totalETL,
  totalCP,
  lastProductCoefficient,
  setLastProduct,
}) {
  const [percent, setPercent] = useState("...");
  const [cratesResult, setCratesResult] = useState("...");
  const [paletsResult, setPaletsResult] = useState("...");

  function calculateFinalResult() {
    const percentCalculation = Math.floor(
      ((totalCP + totalETL) / totalTime) * 100,
    );

    const cratesNeeded = Math.ceil(
      (1.35 * totalTime - totalETL - totalCP) / lastProductCoefficient,
    );

    let paletsCalculation;

    if (cratesNeeded > 0) paletsCalculation = Math.floor(cratesNeeded / 32);
    else paletsCalculation = Math.ceil(cratesNeeded / 32);

    const cratesCalculation = cratesNeeded % 32;

    setPercent(percentCalculation);
    setPaletsResult(paletsCalculation);
    setCratesResult(cratesCalculation);
  }

  function resetResult() {
    setCratesResult("...");
    setPaletsResult("...");
    setPercent("...");
  }

  useEffect(() => {
    if (!totalTime || totalTime === "..." || !lastProductCoefficient) return;
    calculateFinalResult();
  }, [totalTime, totalETL, totalCP, lastProductCoefficient]);

  useEffect(() => {
    if (resetTrigger) {
      resetResult();
    }
  }, [resetTrigger]);

  return (
    <div className="finalResultPanel">
      <button className="infoBtn" onClick={activateInfoPanel}>
        Info
      </button>

      <button className="buttonReset" onClick={reset}>
        Reset
      </button>

      <p className="totalResult"> {percent} %</p>

      <button className="buttonCalculate" onClick={calculate}>
        Berechnen
      </button>

      <p className="totalResult">
        {paletsResult} Paletten <br /> {cratesResult} Kisten
      </p>

      <label className="lastProduct">
        Aktuelle Sorte
        <input
          type="number"
          placeholder="Koeffizient"
          value={lastProductCoefficient}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0 || e.target.value === "")
              setLastProduct(e.target.value);
          }}
        />
      </label>
    </div>
  );
}

export default FinalResultPanel;
