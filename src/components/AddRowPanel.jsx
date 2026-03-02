function AddRowPanel({ onClose, missingLabels }) {
  return (
    <div className="coverPanel">
      <div className="infoTextHolder">
        <h1>Wählen Sie aus, was Sie hinzufügen möchten</h1>

        <div className="choicesPanel">
          <div className="choiceColumn">
            <label className="panelLabel">Eigenes Element</label>
            <button
              className="choiceBtn choicePersonalizedBtn"
              onClick={() => onClose("Sonstiges:")}
            >
              Sonstiges
            </button>

            <button
              className="choiceBtn choicePersonalizedBtn"
              onClick={() => onClose(":")}
            >
              Unvollständig
            </button>
          </div>

          <div className="choiceColumn">
            <label className="panelLabel">Häufigste Elemente</label>
            {missingLabels.map((label) => (
              <button
                key={label}
                className="choiceBtn choiceCommonBtn"
                onClick={() => onClose(label)}
              >
                {label.slice(0, -1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRowPanel;
