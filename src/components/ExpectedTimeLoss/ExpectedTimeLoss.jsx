import { useState, useEffect } from "react";
import DeleteRowPanel from "../DeleteRowPanel.jsx";
import AddRowPanel from "../AddRowPanel.jsx";
import ETL_Row from "./ETL_Row.jsx";

function ExpectedTimeLoss({
  calculateTrigger,
  resetTrigger,
  totalETL,
  setTotalETL,
  people,
  sameTimeAllPeople,
  language,
  setLanguage,
}) {
  const expectedTimeLossLabels = [
    "Messerwechsel:",
    "Etikettenwechsel:",
    "Folienwechsel:",
    "RandStAufwicklung:",
    "Sortenwechsel:",
    "Zwischenreinigung:",
    "Allergene:",
    "Umbau:",
  ];

  const [expectedTimeLossValues, setETLValues] = useState(
    expectedTimeLossLabels.map((label) => ({
      name: label,
      amount: "",
      coefficient: "",
      people: "",
    })),
  );

  const updateETLValues = (index, input, value) => {
    const update = [...expectedTimeLossValues];
    update[index][input] = value;
    setETLValues(update);
  };

  const adjustName = (index, input, value) => {
    value = capitalizeIfLower(value);
    if (!value.trim().endsWith(":")) value += ":";

    updateETLValues(index, input, value);
  };

  function capitalizeIfLower(name) {
    if (!name) return name;

    const firstChar = name[0];
    if (firstChar >= "a" && firstChar <= "z")
      return firstChar.toUpperCase() + name.slice(1);

    return name;
  }

  function calculateETL() {
    let totalETL = expectedTimeLossValues.reduce((result, i) => {
      if (!isNaN(i.amount) && !isNaN(i.coefficient))
        return (
          result +
          i.amount *
            i.coefficient *
            (sameTimeAllPeople === true ? people : i.people)
        );

      return result;
    }, 0);

    totalETL *= 1.35;

    setTotalETL(Math.floor(totalETL));
  }

  function reset() {
    setETLValues((prevValues) =>
      prevValues.map((item) => ({
        ...item,
        amount: "",
      })),
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

  useEffect(() => {
    if (sameTimeAllPeople === false) {
      for (let i = 0; i < expectedTimeLossValues.length; ++i) {
        updateETLValues(i, "people", people);
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
    setETLValues((removeSelected) =>
      removeSelected.filter((_, index) => index !== rowSelected.selectedIndex),
    );
  }

  // adding Rows
  const [addRowPanel, setAddRowPanelVisibility] = useState(false);
  const [missingLabels, setMissingLabels] = useState();

  const activateAddPanel = () => {
    if (expectedTimeLossValues.length > 14) return;

    const currentMissingLabels = expectedTimeLossLabels.filter(
      (label) =>
        !expectedTimeLossValues.some((rowName) => rowName.name === label),
    );

    setMissingLabels(currentMissingLabels);

    if (currentMissingLabels.length > 0) setAddRowPanelVisibility(true);
    else addRow("Sonstiges:");
  };

  const deactivateAddPanel = (newRow) => {
    setAddRowPanelVisibility(false);
    addRow(newRow);
  };

  function addRow(newRow) {
    setETLValues(() => {
      return [
        ...expectedTimeLossValues,
        { name: newRow, amount: "", coefficient: "", people: people },
      ];
    });
  }

  return (
    <div className="CalculationSection">
      <h1>Rüstenrechner</h1>

      <div className="endAlign">
        {expectedTimeLossValues.map((row, index) => (
          <ETL_Row
            key={index}
            index={index}
            name={row.name}
            amount={row.amount}
            coefficient={row.coefficient}
            people={row.people}
            updateETLValues={updateETLValues}
            adjustName={adjustName}
            sameTimeAllPeople={sameTimeAllPeople}
            activateDeletePanel={activateDeletePanel}
          />
        ))}
        <button className="addRow" onClick={activateAddPanel}>
          +
        </button>
      </div>

      <p className="resultSection">Gesamt: {totalETL}</p>

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
    </div>
  );
}

export default ExpectedTimeLoss;
