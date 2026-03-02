function PeoplePanel({ onClose, sameTimeAllPeople }) {
  return (
    <div className="coverPanel">
      <div className="actionPanel">
        <h1>
          {sameTimeAllPeople === "questionNo"
            ? "Sind Sie sicher, dass die Arbeitszeit der Arbeiter unterschiedlich ist?"
            : "Ist die Arbeitszeit für alle Arbeiter gleich?"}
        </h1>

        <div className="actionPanelBtns">
          <button className="peopleBtns" onClick={() => onClose(true)}>
            {sameTimeAllPeople === "questionNo"
              ? "Nein, die Arbeitszeit ist gleich."
              : "Ja, die Zeit ist gleich."}
          </button>

          <button className="peopleBtns" onClick={() => onClose(false)}>
            {sameTimeAllPeople === "questionNo"
              ? "Ja, die Arbeitszeit ist unterschiedlich!"
              : "Nein, die Zeit ist unterschiedlich."}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PeoplePanel;
