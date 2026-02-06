function ExpectedTimeLoss({
  expectedTimeLossValues,
  updateETLValues,
  totalETL,
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
