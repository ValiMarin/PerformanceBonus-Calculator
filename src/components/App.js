import { useState } from "react";
import "../styles/App.css";
import Info from "./Info.jsx";
import MandatoryFields from "./MandatoryFields.jsx";
import TimeCalculator from "./TimeCalculator.jsx";
import ExpectedTimeLoss from "./ExpectedTimeLoss.jsx";
import CompletedProduction from "./CompletedProduction.jsx";
import FinalResultPanel from "./FinalResultPanel.jsx";

function App() {
  const [calculateTrigger, setCalculateTrigger] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const [von, setVon] = useState("");
  const [bis, setBis] = useState("");
  const [people, setPeople] = useState("");
  const [lastProductCoefficient, setLastProduct] = useState("");

  const [totalTime, setTotalTime] = useState(0);
  const [totalETL, setTotalETL] = useState("...");
  const [totalCP, setTotalCP] = useState("...");

  function calculate() {
    if (!von || !bis || !lastProductCoefficient || !people) {
      activateMandatoryFieldsPanel();
      return;
    }

    if (calculateTrigger) return;
    else setCalculateTrigger(true);

    setTimeout(() => {
      setCalculateTrigger(false);
    }, 100);
  }

  function reset() {
    if (resetTrigger) return;
    else setResetTrigger(true);

    setPeople("");
    setVon("");
    setBis("");

    setTimeout(() => {
      setResetTrigger(false);
    }, 100);

    setTotalTime(0);
    setTotalETL("...");
    setTotalCP("...");
    setLastProduct("");
  }

  const [infoPanel, setInfoPanelVisibility] = useState(false);

  const activateInfoPanel = () => {
    setInfoPanelVisibility(true);
  };

  const deactivateInfoPanel = () => {
    setInfoPanelVisibility(false);
  };

  const [mandatoryFields, setMandatoryFields] = useState(false);

  const activateMandatoryFieldsPanel = () => {
    setMandatoryFields(true);
  };

  const deactivateMandatoryFieldsPanel = () => {
    setMandatoryFields(false);
  };
  return (
    <div className="App">
      <header> Prämienrechner </header>

      <div className="CalculationPanel">
        <TimeCalculator
          calculateTrigger={calculateTrigger}
          resetTrigger={resetTrigger}
          von={von}
          setVon={setVon}
          bis={bis}
          setBis={setBis}
          people={people}
          setPeople={setPeople}
          totalTime={totalTime}
          setTotalTime={setTotalTime}
        />

        <ExpectedTimeLoss
          calculateTrigger={calculateTrigger}
          resetTrigger={resetTrigger}
          totalETL={totalETL}
          setTotalETL={setTotalETL}
          people={people}
        />
      </div>
      <CompletedProduction
        calculateTrigger={calculateTrigger}
        resetTrigger={resetTrigger}
        totalCP={totalCP}
        setTotalCP={setTotalCP}
      />

      <FinalResultPanel
        resetTrigger={resetTrigger}
        activateInfoPanel={activateInfoPanel}
        reset={reset}
        calculate={calculate}
        totalTime={totalTime}
        totalETL={totalETL}
        totalCP={totalCP}
        lastProductCoefficient={lastProductCoefficient}
        setLastProduct={setLastProduct}
      />

      {infoPanel && <Info onClose={deactivateInfoPanel} />}

      {mandatoryFields && (
        <MandatoryFields onClose={deactivateMandatoryFieldsPanel} />
      )}
    </div>
  );
}

export default App;
