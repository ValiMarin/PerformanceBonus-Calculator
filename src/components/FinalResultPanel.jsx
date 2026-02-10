import { useState } from "react";
import { useEffect } from "react";

function FinalResultPanel({
  finalResultTrigger,
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

    const paletsCalculation = Math.floor(cratesNeeded / 32);
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
    if (finalResultTrigger) {
      calculateFinalResult();
    }
  }, [
    finalResultTrigger,
    totalCP,
    totalETL,
    totalTime,
    lastProductCoefficient,
  ]);

  useEffect(() => {
    if (resetTrigger) {
      resetResult();
    }
  }, [resetTrigger]);

  return (
    <div className="finalResultPanel">
      <button className="infoBtn" onClick={activateInfoPanel}>
        info
      </button>

      <button className="buttonReset" onClick={reset}>
        Reset
      </button>

      <p className="totalResult">{percent} %</p>

      <button className="buttonCalculate" onClick={calculate}>
        Calculate
      </button>

      <p className="totalResult">
        {paletsResult} palets <br /> {cratesResult} crates
      </p>

      <label className="lastProduct">
        Last Product
        <input
          type="number"
          placeholder="coefficient"
          value={lastProductCoefficient}
          onChange={(e) => setLastProduct(e.target.value)}
        />
      </label>
    </div>
  );
}

export default FinalResultPanel;
