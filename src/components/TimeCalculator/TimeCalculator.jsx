import { useState, useEffect } from "react";
import DeleteRowPanel from "../DeleteRowPanel.jsx";
import AddRowPanel from "../AddRowPanel.jsx";
import CostumizedRow from "./CustomizedRow.jsx";
import PeoplePanel from "./PeoplePanel.jsx";
import WorkSchedule from "./WorkSchedule.jsx";
import TC_Row from "./TC_Row.jsx";

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
  sameTimeAllPeople,
  setSameTimeAllPeople,
  language,
  setLanguage,
}) {
  const commonElements = [
    "Reparatur:",
    "Aufrüsten?",
    "Abrüsten?",
    "Artikelwechsel:",
    "Retoure:",
    "Messerreinigung?",
    "Zusatzreinigung:",
    "Umfahrauftrag:",
    "Allergene:",
    "Unbezahlte Pause:",
  ];

  const [timeCalculatorValues, setTimeCalculatorValues] = useState([
    {
      time: "",
      amount: 1,
      name: "Reparatur:",
      type: "Gesamte Min",
      people: "",
    },
    {
      time: 15,
      amount: false,
      name: "Aufrüsten?",
      type: "checkbox",
      people: "",
    },
    {
      time: 15,
      amount: false,
      name: "Abrüsten?",
      type: "checkbox",
      people: "",
    },
    { time: 15, amount: "", name: "Artikelwechsel:", type: "nr", people: "" },
  ]);

  const updateValues = (index, input, value) => {
    const update = [...timeCalculatorValues];
    update[index][input] = value;
    setTimeCalculatorValues(update);
  };

  const deactivatePeoplePanel = (value) => {
    setSameTimeAllPeople(value);

    if (value) {
      setVon([""]);
      setBis([""]);
    } else differentTime();
  };

  const adjustName = (index, input, value) => {
    value = capitalizeIfLower(value);
    if (!value.trim().endsWith("?") && !value.trim().endsWith(":")) {
      if (timeCalculatorValues[index].type !== "checkbox") value += ":";
      else value += "?";
    }

    updateValues(index, input, value);
  };

  function capitalizeIfLower(name) {
    if (!name) return name;

    const firstChar = name[0];
    if (firstChar >= "a" && firstChar <= "z")
      return firstChar.toUpperCase() + name.slice(1);

    return name;
  }

  function timeStringToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function calculateTime() {
    const justifiedTime = timeCalculatorValues.reduce(
      (total, row) =>
        total + row.time * row.amount * (sameTimeAllPeople ? 1 : row.people),
      0,
    );

    const fullDayMin = 1440;
    const totalMinutes = von.reduce((result, start, i) => {
      let diff = timeStringToMinutes(bis[i]) - timeStringToMinutes(start);
      if (diff < 0) diff += fullDayMin;
      return result + diff;
    }, 0);

    const multiplier = sameTimeAllPeople ? people : 1;

    const resultTime = multiplier * (totalMinutes - justifiedTime);

    setTotalTime(resultTime);
  }

  function reset() {
    setTimeCalculatorValues((lastState) =>
      lastState.map((row) => {
        if (row.type === "Gesamte Min") return { ...row, time: "" };
        else if (row.time === "checkbox") return { ...row, amount: false };

        return { ...row, amount: "" };
      }),
    );

    setSameTimeAllPeople(true);
  }

  function differentTime() {
    const newLength = people;

    setVon((prev) => {
      const oldLength = prev.length;

      if (newLength === oldLength) return prev;

      if (newLength > oldLength)
        return [...prev, ...Array(newLength - oldLength).fill("")];
      else return prev.slice(0, newLength);
    });

    setBis((prev) => {
      const oldLength = prev.length;

      if (newLength === oldLength) return prev;

      if (newLength > oldLength)
        return [...prev, ...Array(newLength - oldLength).fill("")];
      else return prev.slice(0, newLength);
    });
  }

  useEffect(() => {
    if (calculateTrigger) calculateTime();
  }, [calculateTrigger]);

  useEffect(() => {
    if (resetTrigger) reset();
  }, [resetTrigger]);

  useEffect(() => {
    if (sameTimeAllPeople === false) differentTime();
  }, [people]);

  useEffect(() => {
    if (sameTimeAllPeople === false) {
      for (let i = 0; i < timeCalculatorValues.length; ++i) {
        updateValues(i, "people", people);
      }
    }
  }, [sameTimeAllPeople]);

  //deleting rows
  const [deletePanel, setDeletePanelVisibility] = useState(false);
  const [rowSelected, setRowSelected] = useState({
    selectedIndex: 0,
    selectedLabel: "",
  });

  const activateDeletePanel = (index, label) => {
    setDeletePanelVisibility(true);
    setRowSelected({ selectedIndex: index, selectedLabel: label.slice(0, -1) });
  };

  const deactivateDeletePanel = (yesPressed) => {
    setDeletePanelVisibility(false);

    if (yesPressed) deleteRow();
  };

  function deleteRow() {
    setTimeCalculatorValues((removeSelected) =>
      removeSelected.filter((_, index) => index !== rowSelected.selectedIndex),
    );
  }

  //adding rows
  const [addRowPanel, setAddRowPanelVisibility] = useState(false);
  const [missingLabels, setMissingLabels] = useState();

  const activateAddPanel = () => {
    if (timeCalculatorValues.length > 14) return;

    const currentMissingLabels = commonElements.filter(
      (label) =>
        !timeCalculatorValues.some((rowName) => rowName.name === label),
    );

    setMissingLabels(currentMissingLabels);

    setAddRowPanelVisibility(true);
  };

  const deactivateAddPanel = (newRowName) => {
    setAddRowPanelVisibility(false);
    setNewRowName(newRowName);
    activateCostumizedPanel();
  };

  function addRow(time, amount, type) {
    setTimeCalculatorValues(() => {
      return [
        ...timeCalculatorValues,
        {
          time: time,
          amount: amount,
          name: newRowName,
          type: type,
          people: people,
        },
      ];
    });
  }

  //custumizing row
  const [customizedPanel, setCustomizedPanelVisibility] = useState(false);
  const [newRowName, setNewRowName] = useState("");

  const activateCostumizedPanel = () => {
    setCustomizedPanelVisibility(true);
  };

  const deactivateCostumizedPanel = (time, amount, type) => {
    setCustomizedPanelVisibility(false);
    addRow(time, amount, type);
  };

  return (
    <div className="CalculationSection">
      <h1>Zeitrechner</h1>

      <div className="endAlign">
        <label style={{ marginBottom: "1vh" }}>
          Leute:
          <select value={people} onChange={(e) => setPeople(e.target.value)}>
            <option value="" disabled>
              Wie viele?
            </option>
            <option value={1}>1 - Mitarbeiter</option>
            <option value={2}>2 - Mitarbeiter</option>
            <option value={3}>3 - Mitarbeiter</option>
            <option value={4}>4 - Mitarbeiter</option>
            <option value={5}>5 - Mitarbeiter</option>
            <option value={6}>6 - Mitarbeiter</option>
            <option value={7}>7 - Mitarbeiter</option>
            <option value={8}>8 - Mitarbeiter</option>
          </select>
        </label>

        <label>
          Zeit für alle gleich?
          <label className="radioBtnLabel">
            Ja
            <input
              className="checkbox"
              type="radio"
              name="sameTime"
              checked={sameTimeAllPeople === true}
              onChange={() => setSameTimeAllPeople("questionYes")}
            />
          </label>
          -
          <label className="radioBtnLabel" style={{ marginBottom: "0.5vh" }}>
            Nein
            <input
              className="checkbox"
              type="radio"
              name="sameTime"
              checked={sameTimeAllPeople === false}
              onChange={() => {
                if (people > 1) setSameTimeAllPeople("questionNo");
              }}
            />
          </label>
        </label>

        <WorkSchedule
          von={von}
          bis={bis}
          setVon={setVon}
          setBis={setBis}
          sameTimeAllPeople={sameTimeAllPeople}
        />

        {timeCalculatorValues.map((row, index) => (
          <TC_Row
            key={index}
            index={index}
            name={row.name}
            type={row.type}
            time={row.time}
            amount={row.amount}
            people={row.people}
            updateValues={updateValues}
            adjustName={adjustName}
            activateDeletePanel={activateDeletePanel}
            sameTimeAllPeople={sameTimeAllPeople}
          />
        ))}

        <button className="addRow" onClick={activateAddPanel}>
          +
        </button>
      </div>

      <p className="resultSection">Direkte Min: {totalTime}</p>

      {deletePanel && (
        <DeleteRowPanel
          onClose={(value) => deactivateDeletePanel(value)}
          rowSelected={rowSelected}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {addRowPanel && (
        <AddRowPanel
          onClose={(value) => deactivateAddPanel(value)}
          missingLabels={missingLabels}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {customizedPanel && (
        <CostumizedRow
          onClose={(time, amount, type) =>
            deactivateCostumizedPanel(time, amount, type)
          }
          newRowName={newRowName}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {(sameTimeAllPeople === "questionYes" ||
        sameTimeAllPeople === "questionNo") && (
        <PeoplePanel
          onClose={(value) => deactivatePeoplePanel(value)}
          sameTimeAllPeople={sameTimeAllPeople}
          language={language}
          setLanguage={setLanguage}
        />
      )}
    </div>
  );
}

export default TimeCalculator;
