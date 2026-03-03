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

  const [von, setVon] = useState([""]);
  const [bis, setBis] = useState([""]);
  const [people, setPeople] = useState("");
  const [sameTimeAllPeople, setSameTimeAllPeople] = useState(true);
  const [lastProductCoefficient, setLastProduct] = useState("");

  const [totalTime, setTotalTime] = useState("...");
  const [totalETL, setTotalETL] = useState("...");
  const [totalCP, setTotalCP] = useState("...");

  function calculate() {
    if (
      von.some((time) => !time) ||
      bis.some((time) => !time) ||
      !lastProductCoefficient ||
      !people
    ) {
      panelVisibility(1, true);
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

  const [panels, setPanelsVisibility] = useState([false, false]);

  const panelVisibility = (index, value) => {
    const update = [...panels];
    update[index] = value;
    setPanelsVisibility(update);
  };

  return (
    <div className="App">
      <header> Prämienrechner </header>

      <div className="CalculationPanel">
        <FinalResultPanel
          resetTrigger={resetTrigger}
          activateInfoPanel={() => panelVisibility(0, true)}
          reset={reset}
          calculate={calculate}
          totalTime={totalTime}
          totalETL={totalETL}
          totalCP={totalCP}
          lastProductCoefficient={lastProductCoefficient}
          setLastProduct={setLastProduct}
        />

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
        />

        <ExpectedTimeLoss
          calculateTrigger={calculateTrigger}
          resetTrigger={resetTrigger}
          totalETL={totalETL}
          setTotalETL={setTotalETL}
          people={people}
          sameTimeAllPeople={sameTimeAllPeople}
          setSameTimeAllPeople={setSameTimeAllPeople}
        />
      </div>
      <CompletedProduction
        calculateTrigger={calculateTrigger}
        resetTrigger={resetTrigger}
        totalCP={totalCP}
        setTotalCP={setTotalCP}
      />

      {panels[0] && <Info onClose={() => panelVisibility(0, false)} />}

      {panels[1] && (
        <MandatoryFields onClose={() => panelVisibility(1, false)} />
      )}
    </div>
  );
}

export default App;
