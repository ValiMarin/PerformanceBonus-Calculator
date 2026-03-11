import { useState, useEffect } from "react";
import MandatoryFields from "./MandatoryFields.jsx";
import Info from "./Info.jsx";
import Questions from "./Questions.jsx";

function FinalResultPanel({
  resetTrigger,
  reset,
  calculate,
  totalTime,
  totalETL,
  totalCP,
  lastProductCoefficient,
  setLastProduct,
  mandatoryPanel,
  setMandatoryPanelVisibility,
  language,
  setLanguage,
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

  const [infoPanel, setInfoPanelVisibility] = useState(false);
  const updateInfoPanelVisibility = (value) => {
    setInfoPanelVisibility(value);
  };

  const [questions, setQuestiosPanelVisibility] = useState(false);
  const [question, setCurrentQuestion] = useState();
  const updateQuestionsPanelVisibility = (value, question) => {
    if (question !== null) setCurrentQuestion(question);
    setQuestiosPanelVisibility(value);
  };

  const updateMandatoryPanelVisibility = (value) => {
    setMandatoryPanelVisibility(value);
  };

  return (
    <div className="finalResultPanel">
      <button
        className="infoBtn"
        onClick={() => updateInfoPanelVisibility(true)}
      >
        Info
      </button>

      <button className="buttonReset" onClick={reset}>
        Reset
      </button>

      <div style={{ position: "relative", display: "inline-block" }}>
        <p className="totalResult">{percent} %</p>

        <button
          className="questionBtn"
          style={{ top: "70%", right: "0%" }}
          onClick={() => updateQuestionsPanelVisibility(true, 0)}
        >
          ?
        </button>
      </div>

      <button className="buttonCalculate" onClick={calculate}>
        Berechnen
      </button>

      <div style={{ position: "relative", display: "inline-block" }}>
        <p className="totalResult">
          {paletsResult} Paletten <br /> {cratesResult} Kisten
        </p>

        <button
          className="questionBtn"
          style={{ top: "75%", right: "0%" }}
          onClick={() => updateQuestionsPanelVisibility(true, 1)}
        >
          ?
        </button>
      </div>

      <div style={{ position: "relative", display: "inline-block" }}>
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
        <button
          className="questionBtn"
          style={{ top: "0%", right: "-25%" }}
          onClick={() => updateQuestionsPanelVisibility(true, 2)}
        >
          ?
        </button>
      </div>

      {infoPanel && (
        <Info
          onClose={() => updateInfoPanelVisibility(false)}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {mandatoryPanel && (
        <MandatoryFields
          onClose={() => updateMandatoryPanelVisibility(false)}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {questions && (
        <Questions
          onClose={() => updateQuestionsPanelVisibility(false, null)}
          language={language}
          setLanguage={setLanguage}
          question={question}
        />
      )}
    </div>
  );
}

export default FinalResultPanel;
