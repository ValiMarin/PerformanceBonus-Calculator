import LanguagesPanel from "./LanguagesPanel";

function DeleteRowPanel({ onClose, rowSelected, language, setLanguage }) {
  const titles = [
    "Sind Sie sicher, dass Sie diesen Element löschen möchten?",
    "Sunteți sigur că doriți să ștergeți acest element?",
    "Are you sure you want to delete this element?",
    "Вы уверены, что хотите удалить этот элемент?",
  ];

  const names = ["Name:", "Nume:", "Name:", "Имя:"];
  const positiveAnswers = ["Ja", "Da", "Yes", "Да"];
  const negativeAnswers = ["Nein", "Nu", "No", "Нет"];

  return (
    <div className="coverPanel">
      <div className="actionPanel">
        <h1>{titles[language]}</h1>

        <p className="resultSection">
          {names[language]} {rowSelected.selectedLabel}
        </p>

        <div className="actionPanelBtns">
          <button className="panelBtn" onClick={() => onClose(true)}>
            {positiveAnswers[language]}
          </button>
          <button className="panelBtn" onClick={() => onClose(false)}>
            {negativeAnswers[language]}
          </button>
        </div>
      </div>

      <LanguagesPanel setLanguage={setLanguage} />
    </div>
  );
}

export default DeleteRowPanel;
