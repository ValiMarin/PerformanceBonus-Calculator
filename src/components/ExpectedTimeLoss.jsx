import { useState } from "react";
import { useEffect } from "react";

function ExpectedTimeLoss({
  calculateTrigger,
  resetTrigger,
  totalETL,
  setTotalETL,
  people,
}) {
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

  const updateETLValues = (index, input, value) => {
    const update = [...expectedTimeLossValues];
    update[index][input] = value;
    setETLValues(update);
  };

  function calculateETL() {
    let totalETL = 0;
    expectedTimeLossValues.forEach((i) => {
      if (!isNaN(i.amount) && !isNaN(i.coefficient)) {
        totalETL += i.amount * i.coefficient;
      }
    });
    totalETL *= people;
    totalETL += (totalETL * 35) / 100;

    setTotalETL(Math.floor(totalETL));
  }

  function reset() {
    setETLValues(
      expectedTimeLossLabels.map(() => ({ amount: "", coefficient: "" })),
    );
  }

  useEffect(() => {
    if (calculateTrigger) {
      calculateETL();
    }
  }, [calculateTrigger]);

  useEffect(() => {
    if (resetTrigger) {
      reset();
    }
  }, [resetTrigger]);

  return (
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
              onChange={(e) => updateETLValues(index, "amount", e.target.value)}
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

      <p>Total: {totalETL}</p>
    </div>
  );
}

export default ExpectedTimeLoss;
