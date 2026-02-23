import { useState, useEffect } from "react";

function ExpectedTimeLoss({
  calculateTrigger,
  resetTrigger,
  totalETL,
  setTotalETL,
  people,
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
    })),
  );

  const updateETLValues = (index, input, value) => {
    const update = [...expectedTimeLossValues];
    update[index][input] = value;
    setETLValues(update);
  };

  const addDots = (index, name, value) => {
    const update = [...expectedTimeLossValues];

    if (!value.trim().endsWith(":")) {
      update[index][name] = value + ":";
      setETLValues(update);
    }
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
        { name: newRow, amount: "", coefficient: "" },
      ];
    });
  }

  return (
    <div className="CalculationSection">
      <h1>Rüstenrechner</h1>

      <div className="endAlign">
        {expectedTimeLossValues.map((row, index) => (
          <div className="rowDiv" key={index}>
            <input
              className="customLabel"
              type="text"
              maxLength={18}
              value={row.name}
              onChange={(e) => updateETLValues(index, "name", e.target.value)}
              onBlur={(e) => addDots(index, "name", e.target.value)}
            />

            <input
              type="number"
              placeholder="nr"
              value={row.amount}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 || e.target.value === "")
                  updateETLValues(index, "amount", e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Koeffizient"
              value={row.coefficient}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 || e.target.value === "")
                  updateETLValues(index, "coefficient", e.target.value);
              }}
            />
            <button
              className="eraseRowBtn"
              onClick={() => activateDeletePanel(index, row.name)}
            >
              X
            </button>
          </div>
        ))}
        <button className="addRow" onClick={activateAddPanel}>
          +
        </button>
      </div>

      <p className="resultSection">Gesamt: {totalETL}</p>

      {deletePanel && (
        <div className="coverPanel">
          <div className="actionPanel">
            <h1>Sind Sie sicher, dass Sie diese Zeile löschen möchten?</h1>

            <p className="resultSection">Name: {rowSelected.selectedLabel}</p>

            <div className="actionPanelBtns">
              <button
                className="panelBtn"
                onClick={() => deactivateDeletePanel(true)}
              >
                Ja
              </button>
              <button
                className="panelBtn"
                onClick={() => deactivateDeletePanel(false)}
              >
                Nein
              </button>
            </div>
          </div>
        </div>
      )}

      {addRowPanel && (
        <div className="coverPanel">
          <div className="infoTextHolder">
            <h1>Wählen Sie aus, was Sie hinzufügen möchten</h1>

            <div className="choicesPanel">
              <div className="choiceColumn">
                <label>Benutzerdefiniertes Element</label>
                <button
                  className="choiceBtn choicePersonalizedBtn"
                  onClick={() => deactivateAddPanel("Sonstiges:")}
                >
                  Sonstiges
                </button>

                <button
                  className="choiceBtn choicePersonalizedBtn"
                  onClick={() => deactivateAddPanel(":")}
                >
                  Unvollständig
                </button>
              </div>

              <div className="choiceColumn">
                <label>Häufigste Elemente</label>
                {missingLabels.map((label) => (
                  <button
                    key={label}
                    className="choiceBtn choiceCommonBtn"
                    onClick={() => deactivateAddPanel(label)}
                  >
                    {label.slice(0, -1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpectedTimeLoss;
