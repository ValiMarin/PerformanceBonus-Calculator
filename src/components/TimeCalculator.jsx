import { useState, useEffect } from "react";

function TimeCalculator({
  calculateTrigger,
  resetTrigger,
  von,
  setVon,
  bis,
  setBis,
  people,
  setPeople,
  totalTime,
  setTotalTime,
}) {
  const timeCalculatorLabels = [
    "Von:",
    "Bis:",
    "Leute:",
    "Reparatur",
    "Aufrüsten?",
    "Abrüsten?",
    "Artikelwechsel:",
    "Messer hauben?",
  ];

  const [repairs, setRepairTime] = useState("");
  const [open, checkOpen] = useState(false);
  const [close, checkClose] = useState(false);
  const [articles, setNrArticles] = useState("");
  const [slicerCoverClean, checkSlicerCoverClean] = useState("");

  function timeStringToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function calculateTime() {
    let justifiedTime = 0;
    if (open) justifiedTime += 15;
    if (close) justifiedTime += 15;
    if (articles > 0) justifiedTime += 15 * articles;
    if (slicerCoverClean) justifiedTime += 5;

    const startMinutes = timeStringToMinutes(von);
    const endMinutes = timeStringToMinutes(bis);
    const fullDayMin = 1440;

    let totalMinutes = endMinutes - startMinutes;

    if (totalMinutes < 0) totalMinutes += fullDayMin;

    const resultTime = people * (totalMinutes - repairs - justifiedTime);

    setTotalTime(resultTime);
  }

  function reset() {
    setRepairTime("");
    checkOpen(false);
    checkClose(false);
    setNrArticles("");
    checkSlicerCoverClean(false);
  }

  useEffect(() => {
    if (calculateTrigger) {
      calculateTime();
    }
  }, [calculateTrigger]);

  useEffect(() => {
    if (resetTrigger) {
      reset();
    }
  }, [resetTrigger]);

  return (
    <div className="CalculationSection">
      <h1>Zeitrechner</h1>

      <div className="endAlign">
        {timeCalculatorLabels.map((text, index) => (
          <div className="rowDiv" key={index}>
            <input
              className="customLabel"
              type="text"
              maxLength={17}
              value={text}
              //onChange={(e) => updateETLValues(index, "label", e.target.value)}
            />
            {index === 0 && (
              <input
                type="time"
                lang="en-GB"
                value={von}
                onChange={(e) => setVon(e.target.value)}
              />
            )}
            {index === 1 && (
              <input
                type="time"
                lang="en-GB"
                value={bis}
                onChange={(e) => setBis(e.target.value)}
              />
            )}
            {index === 2 && (
              <select
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              >
                <option value="" disabled>
                  Wie viele?
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            )}
            {index === 3 && (
              <input
                type="number"
                placeholder="Gesamte Min"
                value={repairs}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0 || e.target.value === "")
                    setRepairTime(e.target.value);
                }}
              />
            )}
            {index === 4 && (
              <input
                type="checkbox"
                checked={open}
                onChange={(e) => checkOpen(e.target.checked)}
              />
            )}
            {index === 5 && (
              <input
                type="checkbox"
                checked={close}
                onChange={(e) => checkClose(e.target.checked)}
              />
            )}
            {index === 6 && (
              <input
                type="number"
                placeholder="nr"
                value={articles}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0 || e.target.value === "")
                    setNrArticles(e.target.value);
                }}
              />
            )}
            {index === 7 && (
              <input
                type="checkbox"
                checked={slicerCoverClean}
                onChange={(e) => checkSlicerCoverClean(e.target.checked)}
              />
            )}
            {/*<button className="eraseRowBtn">X</button>*/}
          </div>
        ))}
      </div>

      <p className="resultSection">Direkte Min: {totalTime}</p>
    </div>
  );
}

export default TimeCalculator;
