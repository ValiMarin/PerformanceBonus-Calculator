function FinalResultPanel({
  activateInfoPanel,
  reset,
  calculate,
  paletsResult,
  cratesResult,
  setLastProduct,
  lastProductCoefficient,
  percent,
}) {
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
