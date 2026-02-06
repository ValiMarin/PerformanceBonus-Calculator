function TimeCalculator({
  workingHours,
  setWorkingHours,
  repairs,
  setRepairTime,
  open,
  checkOpen,
  close,
  checkClose,
  articles,
  setNrArticles,
  slicerCoverClean,
  checkSlicerCoverClean,
  people,
  setPeople,
  totalTime,
}) {
  const timeCalculatorLabels = [
    "Working hours:",
    "People:",
    "Repair time:",
    "Open line?",
    "Close line?",
    "Article change:",
    "Slicer Cover Clean?",
  ];

  return (
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
  );
}

export default TimeCalculator;
