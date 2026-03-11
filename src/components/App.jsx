import { useState } from "react";
import "../styles/App.css";
import TimeCalculator from "./TimeCalculator/TimeCalculator.jsx";
import ExpectedTimeLoss from "./ExpectedTimeLoss/ExpectedTimeLoss.jsx";
import CompletedProduction from "./CompletedProduction/CompletedProduction.jsx";
import FinalResultPanel from "./MainActionPanel/FinalResultPanel.jsx";

function App() {
  const [calculateTrigger, setCalculateTrigger] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const [von, setVon] = useState([""]);
  const [bis, setBis] = useState([""]);
  const [people, setPeople] = useState("");
  const [sameTimeAllPeople, setSameTimeAllPeople] = useState(true);
  const [lastProductCoefficient, setLastProduct] = useState("");

  const [totalTime, setTotalTime] = useState("...");
  const [totalETL, setTotalETL] = useState("...");
  const [totalCP, setTotalCP] = useState("...");

  const [language, setLanguage] = useState(0);

  const [mandatoryPanel, setMandatoryPanelVisibility] = useState(false);

  function calculate() {
    if (
      von.some((time) => !time) ||
      bis.some((time) => !time) ||
      !lastProductCoefficient ||
      !people
    ) {
      setMandatoryPanelVisibility(true);
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
    setVon([""]);
    setBis([""]);

    setTimeout(() => {
      setResetTrigger(false);
    }, 100);

    setTotalTime("...");
    setTotalETL("...");
    setTotalCP("...");
    setLastProduct("");
  }

  return (
    <div className="App">
      <header> Prämienrechner </header>

      <FinalResultPanel
        resetTrigger={resetTrigger}
        reset={reset}
        calculate={calculate}
        totalTime={totalTime}
        totalETL={totalETL}
        totalCP={totalCP}
        lastProductCoefficient={lastProductCoefficient}
        setLastProduct={setLastProduct}
        mandatoryPanel={mandatoryPanel}
        setMandatoryPanelVisibility={setMandatoryPanelVisibility}
        language={language}
        setLanguage={setLanguage}
      />

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
          sameTimeAllPeople={sameTimeAllPeople}
          setSameTimeAllPeople={setSameTimeAllPeople}
          language={language}
          setLanguage={setLanguage}
        />

        <ExpectedTimeLoss
          calculateTrigger={calculateTrigger}
          resetTrigger={resetTrigger}
          totalETL={totalETL}
          setTotalETL={setTotalETL}
          people={people}
          sameTimeAllPeople={sameTimeAllPeople}
          setSameTimeAllPeople={setSameTimeAllPeople}
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      <CompletedProduction
        calculateTrigger={calculateTrigger}
        resetTrigger={resetTrigger}
        totalCP={totalCP}
        setTotalCP={setTotalCP}
      />
    </div>
  );
}

export default App;
