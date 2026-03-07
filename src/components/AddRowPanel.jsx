import LanguagesPanel from "./LanguagesPanel";

function AddRowPanel({ onClose, missingLabels, language, setLanguage }) {
  const titles = [
    "Wählen Sie aus, was Sie hinzufügen möchten!",
    "Alegeți ce doriți să adăugați!",
    "Select what you want to add!",
    "Выберите, что хотите добавить!",
  ];

  const customElement = [
    "Eigenes Element",
    "Element propriu",
    "Custom element",
    "Собственный элемент",
  ];

  const mostCommonElement = [
    "Häufigste Elemente",
    "Cele mai folosite elemente",
    "Most used elements",
    "Наиболее часто встречающиеся элементы",
  ];

  const verticalPosition = 11;
  const horizontalPosition = 3;

  return (
    <div className="coverPanel">
      <div className="infoTextHolder">
        <h1>{titles[language]}</h1>

        <div className="choicesPanel">
          <div className="choiceColumn">
            <label className="panelLabel">{customElement[language]}</label>
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
            <label className="panelLabel">{mostCommonElement[language]}</label>
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

      <LanguagesPanel
        setLanguage={setLanguage}
        verticalPosition={verticalPosition}
        horizontalPosition={horizontalPosition}
      />
    </div>
  );
}

export default AddRowPanel;
