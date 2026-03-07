import LanguagesPanel from "../LanguagesPanel";

function PeoplePanel({ onClose, sameTimeAllPeople, language, setLanguage }) {
  const title_No = [
    "Sind Sie sicher, dass die Arbeitszeit der Arbeiter unterschiedlich ist?",
    "Sunteți sigur că timpul de lucru al muncitorilor este diferit?",
    "Are you sure the workers' working time is different?",
    "Вы уверены, что рабочее время работников отличается?",
  ];

  const positiveAnswer_No = [
    "Ja, die Arbeitszeit ist unterschiedlich!",
    "Da, timpul de lucru este diferit!",
    "Yes, the working time is different!",
    "Да, рабочее время отличается!",
  ];

  const negativeAnswer_No = [
    "Nein, die Arbeitszeit ist gleich.",
    "Nu, timpul de lucru este același.",
    "No, the working time is the same.",
    "Нет, рабочее время одинаковое.",
  ];

  const title_Yes = [
    "Ist die Arbeitszeit für alle Arbeiter gleich?",
    "Timpul de lucru este același pentru toți muncitorii?",
    "Is the working time the same for all workers?",
    "Рабочее время одинаково для всех работников?",
  ];

  const positiveAnswer_Yes = [
    "Ja, die Zeit ist gleich.",
    "Da, timpul este același.",
    "Yes, the time is the same.",
    "Да, время одинаковое.",
  ];

  const negativeAnswer_Yes = [
    "Nein, die Zeit ist unterschiedlich.",
    "Nu, timpul este diferit.",
    "No, the time is different.",
    "Нет, время различное.",
  ];
  return (
    <div className="coverPanel">
      <div className="actionPanel">
        <h1>
          {sameTimeAllPeople === "questionNo"
            ? title_No[language]
            : title_Yes[language]}
        </h1>

        <div className="actionPanelBtns">
          <button className="peopleBtns" onClick={() => onClose(true)}>
            {sameTimeAllPeople === "questionNo"
              ? negativeAnswer_No[language]
              : positiveAnswer_Yes[language]}
          </button>

          <button className="peopleBtns" onClick={() => onClose(false)}>
            {sameTimeAllPeople === "questionNo"
              ? positiveAnswer_No[language]
              : negativeAnswer_Yes[language]}
          </button>
        </div>
      </div>

      <LanguagesPanel setLanguage={setLanguage} />
    </div>
  );
}

export default PeoplePanel;
