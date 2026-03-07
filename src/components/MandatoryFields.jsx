import LanguagesPanel from "./LanguagesPanel";

function MandatoryFields({ onClose, language, setLanguage }) {
  const titles = [
    "Bitte füllen Sie die folgenden Pflichtfelder aus: Leute, Von, Bis und Aktuelle Sorte.",
    "Vă rugăm să completați următoarele câmpuri obligatorii: Leute, Von, Bis și Aktuelle Sorte.",
    "Please fill in the following required fields: Leute, Von, Bis and Aktuelle Sorte.",
    "Пожалуйста, заполните следующие обязательные поля: Leute, Von, Bis и Aktuelle Sorte.",
  ];

  return (
    <div className="coverPanel">
      <div className="actionPanel">
        <h1>{titles[language]}</h1>
        <button className="panelBtn" onClick={onClose}>
          OK
        </button>
      </div>

      <LanguagesPanel setLanguage={setLanguage} />
    </div>
  );
}

export default MandatoryFields;
