import { useState } from "react";
import "../styles/App.css";
import Info from "./Info.jsx";
import MandatoryFields from "./MandatoryFields.jsx";
import TimeCalculator from "./TimeCalculator.jsx";
import ExpectedTimeLoss from "./ExpectedTimeLoss.jsx";
import CompletedProduction from "./CompletedProduction.jsx";
import FinalResultPanel from "./FinalResultPanel.jsx";

function App() {
  const [workingHours, setWorkingHours] = useState("");
  const [people, setPeople] = useState("");
  const [repairs, setRepairTime] = useState("");
  const [open, checkOpen] = useState(false);
  const [close, checkClose] = useState(false);
  const [articles, setNrArticles] = useState("");
  const [slicerCoverClean, checkSlicerCoverClean] = useState("");
  const [totalTime, setTotalTime] = useState(0);

  const [totalETL, setTotalETL] = useState("...");
  const [expectedTimeLossValues, setETLValues] = useState(
    Array.from({ length: 8 }, () => ({ amount: "", coefficient: "" })),
  );

  const updateETLValues = (index, input, value) => {
    const update = [...expectedTimeLossValues];
    update[index][input] = value;
    setETLValues(update);
  };

  const [totalCP, setTotalCP] = useState("...");
  const [products, setNewProduct] = useState([]);

  const addProduct = () => {
    setNewProduct((lastState) => {
      if (lastState.length >= 9) {
        return lastState;
      }
      return [...products, { label: "", crates: "", coefficient: "" }];
    });
  };

  const deleteProduct = () => {
    setNewProduct((lastState) => lastState.slice(0, -1));
  };

  const newValues = (index, inputs, value) => {
    const newProduct = [...products];
    newProduct[index][inputs] = value;
    setNewProduct(newProduct);
  };

  const [lastProductCoefficient, setLastProduct] = useState("");
  const [percent, setPercent] = useState("...");
  const [cratesResult, setCratesResult] = useState("...");
  const [paletsResult, setPaletsResult] = useState("...");

  function calculate() {
    if (workingHours === "" || lastProductCoefficient === "" || people === "") {
      activateMandatoryFieldsPanel();
      return;
    }

    const totalTimeCalculation = calculateTotalTime();
    const totalETLCalculation = ETLCalculator();
    const totalCPCalculation = CPCalculator();
    const percentCalculation = Math.floor(
      ((totalCPCalculation + totalETLCalculation) / totalTimeCalculation) * 100,
    );

    const cratesNeeded = Math.ceil(
      (1.35 * totalTimeCalculation - totalETLCalculation - totalCPCalculation) /
        lastProductCoefficient,
    );

    const paletsCalculation = Math.floor(cratesNeeded / 32);
    const cratesCalculation = cratesNeeded % 32;

    setTotalTime(totalTimeCalculation);
    setTotalETL(totalETLCalculation);
    setTotalCP(totalCPCalculation);
    setPercent(percentCalculation);
    setPaletsResult(paletsCalculation);
    setCratesResult(cratesCalculation);
  }

  function calculateTotalTime() {
    let justifiedTime = 0;
    if (open) justifiedTime += 15;
    if (close) justifiedTime += 15;
    if (articles > 0) justifiedTime += 15 * articles;
    if (slicerCoverClean) justifiedTime += 5;

    const workingMinutes = workingHours * 60;
    const resultTime = people * (workingMinutes - repairs - justifiedTime);

    return resultTime;
  }

  function ETLCalculator() {
    let totalETL = 0;
    expectedTimeLossValues.forEach((i) => {
      if (!isNaN(i.amount) && !isNaN(i.coefficient)) {
        totalETL += i.amount * i.coefficient;
      }
    });
    totalETL *= people;
    totalETL += (totalETL * 35) / 100;

    return Math.floor(totalETL);
  }

  function CPCalculator() {
    let totalCP = 0;
    products.forEach((i) => {
      if (!isNaN(i.crates) && !isNaN(i.coefficient)) {
        totalCP += i.crates * i.coefficient;
      }
    });

    return Math.floor(totalCP);
  }

  function reset() {
    setTotalTime(0);
    setPeople("");
    setRepairTime("");
    checkOpen(false);
    checkClose(false);
    setWorkingHours("");
    setNrArticles("");
    checkSlicerCoverClean(false);

    setETLValues(
      Array.from({ length: 8 }, () => ({ amount: "", coefficient: "" })),
    );
    setTotalETL("...");

    setNewProduct([]);
    setTotalCP("...");

    setLastProduct("");
    setCratesResult("...");
    setPaletsResult("...");
    setPercent("...");
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
          workingHours={workingHours}
          setWorkingHours={setWorkingHours}
          people={people}
          setPeople={setPeople}
          repairs={repairs}
          setRepairTime={setRepairTime}
          open={open}
          checkOpen={checkOpen}
          close={close}
          checkClose={checkClose}
          articles={articles}
          setNrArticles={setNrArticles}
          slicerCoverClean={slicerCoverClean}
          checkSlicerCoverClean={checkSlicerCoverClean}
          totalTime={totalTime}
        />

        <ExpectedTimeLoss
          expectedTimeLossValues={expectedTimeLossValues}
          updateETLValues={updateETLValues}
          totalETL={totalETL}
        />

        <CompletedProduction
          products={products}
          newValues={newValues}
          addProduct={addProduct}
          deleteProduct={deleteProduct}
          totalCP={totalCP}
        />
      </div>

      <FinalResultPanel
        activateInfoPanel={activateInfoPanel}
        reset={reset}
        calculate={calculate}
        paletsResult={paletsResult}
        cratesResult={cratesResult}
        setLastProduct={setLastProduct}
        lastProductCoefficient={lastProductCoefficient}
        percent={percent}
      />

      {infoPanel && <Info onClose={deactivateInfoPanel} />}

      {mandatoryFields && (
        <MandatoryFields onClose={deactivateMandatoryFieldsPanel} />
      )}
    </div>
  );
}

export default App;
