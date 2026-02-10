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
  const [finalResultTrigger, setFinalResultTrigger] = useState(false);

  const [workingHours, setWorkingHours] = useState("");
  const [people, setPeople] = useState("");

  const [totalTime, setTotalTime] = useState(0);
  const [totalETL, setTotalETL] = useState("...");
  const [totalCP, setTotalCP] = useState("...");

  const [lastProductCoefficient, setLastProduct] = useState("");

  function calculate() {
    if (workingHours === "" || lastProductCoefficient === "" || people === "") {
      activateMandatoryFieldsPanel();
      return;
    }

    if (calculateTrigger) return;
    else setCalculateTrigger(true);

    setFinalResultTrigger(true);

    setTimeout(() => {
      setCalculateTrigger(false);
      setFinalResultTrigger(false);
    }, 100);
  }

  function reset() {
    setPeople("");
    setWorkingHours("");

    setResetTrigger(true);

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
      <header> Performance Bonus - Calculator </header>

      <div className="CalculationPanel">
        <TimeCalculator
          calculateTrigger={calculateTrigger}
          resetTrigger={resetTrigger}
          workingHours={workingHours}
          setWorkingHours={setWorkingHours}
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

        <CompletedProduction
          calculateTrigger={calculateTrigger}
          resetTrigger={resetTrigger}
          totalCP={totalCP}
          setTotalCP={setTotalCP}
        />
      </div>

      <FinalResultPanel
        finalResultTrigger={finalResultTrigger}
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
