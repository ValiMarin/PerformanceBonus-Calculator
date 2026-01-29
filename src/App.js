import { useState } from "react";
import "./App.css";

function App() {
  const [workingHours, setWorkingHours] = useState("");
  const [people, setPeople] = useState("");
  const [repairs, setRepairTime] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [open, checkOpen] = useState(false);
  const [close, checkClose] = useState(false);
  const [articles, setNrArticles] = useState("");
  const [slicerCoverClean, checkSlicerCoverClean] = useState("");

  const expectedTimeLossLabels = [
    "Slicer Change:",
    "Label Roll Change:",
    "Plastic Roll Change:",
    "Plastic Residue Clean:",
    "Product Change:",
    "General Clean:",
    "Allergen Clean:",
    "Line Reconfiguration:",
  ];

  const [expectedTimeLossValues, setETLValues] = useState(
    expectedTimeLossLabels.map(() => ({ amount: "", coefficient: "" })),
  );

  const updateETLValues = (index, inputs, value) => {
    const update = [...expectedTimeLossValues];
    update[index][inputs] = value;
    setETLValues(update);
  };

  const [totalETL, setTotalETL] = useState("");

  const timeCalculatorLabels = [
    "Working hours:",
    "People:",
    "Repair time:",
    "Open line?",
    "Close line?",
    "Article change:",
    "Slicer Cover Clean?",
  ];

  const [products, setNewProduct] = useState([]);
  const [totalCP, setTotalCP] = useState("");

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

  const [cratesResult, setCratesResult] = useState("...");
  const [paletsResult, setPaletsResult] = useState("...");

  function calculate() {
    if (workingHours === "" || lastProductCoefficient === "" || people === "") {
      activateMandatoryFieldsPanel();
      return;
    }

    let quarters = 0;
    if (open) quarters += 15;
    if (close) quarters += 15;
    if (articles > 0) quarters += 15 * articles;
    if (slicerCoverClean) quarters += 5;
    let workingMinutes = workingHours * 60;
    const resultTime = people * (workingMinutes - repairs - quarters);
    setTotalTime(resultTime);

    let totalETL = 0;
    expectedTimeLossValues.forEach((i) => {
      if (!isNaN(i.amount) && !isNaN(i.coefficient)) {
        totalETL += i.amount * i.coefficient;
      }
    });
    totalETL *= people;
    totalETL += (totalETL * 35) / 100;
    setTotalETL(totalETL);

    let totalCP = 0;
    products.forEach((i) => {
      if (!isNaN(i.crates) && !isNaN(i.coefficient)) {
        totalCP += i.crates * i.coefficient;
      }
    });
    setTotalCP(totalCP);

    let finalResult = Math.ceil(
      (1.35 * resultTime - totalCP - totalETL) / lastProductCoefficient,
    );
    setPaletsResult(Math.floor(finalResult / 32));
    setCratesResult(finalResult % 32);
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
      expectedTimeLossLabels.map(() => ({
        amount: "",
        coefficient: "",
      })),
    );
    setTotalETL("");

    setNewProduct([]);
    setTotalCP("");

    setLastProduct("");
    setCratesResult("...");
    setPaletsResult("...");
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

      {/*Calculation Panel*/}
      <div className="CalculationPanel">
        {/*Container for Time Calculator*/}
        <div className="CalculationSection">
          <h1>Time Calculator</h1>

          <div className="endAlign">
            {timeCalculatorLabels.map((text, index) => (
              <label key={index}>
                {text}
                {index === 0 && (
                  <input
                    type="number"
                    placeholder="Total hours"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                  />
                )}
                {index === 1 && (
                  <select
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                  >
                    <option value="" disabled>
                      How many?
                    </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                )}
                {index === 2 && (
                  <input
                    type="number"
                    placeholder="Total minutes"
                    value={repairs}
                    onChange={(e) => setRepairTime(e.target.value)}
                  />
                )}
                {index === 3 && (
                  <input
                    type="checkbox"
                    checked={open}
                    onChange={(e) => checkOpen(e.target.checked)}
                  />
                )}
                {index === 4 && (
                  <input
                    type="checkbox"
                    checked={close}
                    onChange={(e) => checkClose(e.target.checked)}
                  />
                )}
                {index === 5 && (
                  <input
                    type="number"
                    placeholder="nr"
                    value={articles}
                    onChange={(e) => setNrArticles(e.target.value)}
                  />
                )}
                {index === 6 && (
                  <input
                    type="checkbox"
                    checked={slicerCoverClean}
                    onChange={(e) => checkSlicerCoverClean(e.target.checked)}
                  />
                )}
              </label>
            ))}
          </div>

          <p>Total time: {totalTime} min</p>
        </div>

        {/*Container for expected time loss*/}
        <div className="CalculationSection">
          <h1>Expected Time Loss</h1>

          <div className="endAlign">
            {expectedTimeLossLabels.map((text, index) => (
              <label key={index}>
                {text}
                <input
                  type="number"
                  placeholder="nr"
                  value={expectedTimeLossValues[index].amount}
                  onChange={(e) =>
                    updateETLValues(index, "amount", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Line-coefficient"
                  value={expectedTimeLossValues[index].coefficient}
                  onChange={(e) =>
                    updateETLValues(index, "coefficient", e.target.value)
                  }
                />
              </label>
            ))}
          </div>

          <p>Total: ...{totalETL}</p>
        </div>

        {/*Container for completed production*/}
        <div className="CalculationSection">
          <h1>Completed Production</h1>

          <div className="divProduct">
            {products.map((inputs, index) => (
              <div className="divProductRow" key={index}>
                <label>{index + 1}.</label>
                <input
                  type="number"
                  placeholder="Total crates"
                  value={inputs.crates}
                  onChange={(e) => newValues(index, "crates", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Prod-coefficient"
                  value={inputs.coefficient}
                  onChange={(e) =>
                    newValues(index, "coefficient", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="divProductionBtns">
            <button className="productionBtns" onClick={addProduct}>
              +
            </button>
            <button className="productionBtns" onClick={deleteProduct}>
              -
            </button>
          </div>

          <p>Total: ...{totalCP}</p>
        </div>
      </div>

      {/*Container for buttons & final result*/}
      <div className="finalResultPanel">
        <button className="infoBtn" onClick={activateInfoPanel}>
          info
        </button>

        <button className="buttonReset" onClick={reset}>
          Reset
        </button>

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

      {infoPanel && (
        <div className="infoPanel">
          <div className="infoTextHolder">
            <h1>Why to use & How to use</h1>

            <p className="infoText">
              &nbsp;&nbsp;This calculator is designed for a packing factory and
              calculates the quantity of product that needs to be completed in
              order to earn a bonus (extra money). The factory has over 50
              production lines, and each line has an employee who manually
              calculates this bonus. With this calculator, employees can easily
              determine the bonus by entering the required inputs.
              <br />
              <br /> &nbsp;&nbsp;<b>How to use!</b>
              <br /> The employee has to complete 3 main sections:
              <br />
              <br />
              &nbsp;&nbsp; 1. <b>Time Calculator –</b> calculates the total
              working time based on how many people are assigned to that line
              and subtracts unexpected time loss.
              <br /> <br />
              &nbsp;&nbsp; <b>2. Expected Time Loss –</b> calculates every
              expected action that may occur (e.g., label roll change, plastic
              roll change, etc.). Each action has a specific line coefficient
              that multiplies the action time. All actions are then summed and
              multiplied by the number of people. This result is multiplied
              again by 1.35, because to earn the bonus, the line must produce at
              135% capacity.
              <br /> <br />
              &nbsp;&nbsp; 3. <b>Completed Production – </b>represents orders
              that have already been completed by the employees. Each order
              includes the number of crates produced and a specific coefficient
              for each product. The calculation involves summing all products,
              where the number of crates for each product is multiplied by its
              corresponding coefficient.
              <br /> <br />
              &nbsp;&nbsp; After completing all three sections, the employee
              must enter the current coefficient in the 'Last Product' field,
              then press 'Calculate' to determine the quantity that needs to be
              produced to complete the bonus.
            </p>

            <button className="infoOkBtn" onClick={deactivateInfoPanel}>
              OK
            </button>
          </div>
        </div>
      )}

      {mandatoryFields && (
        <div className="infoPanel">
          <div className="mandatoryFieldsPanel">
            <h1>
              The following fields are mandatory: Working Hours, People, and
              Last Product.
            </h1>
            <button
              className="infoOkBtn"
              onClick={deactivateMandatoryFieldsPanel}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
