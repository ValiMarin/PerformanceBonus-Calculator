function MandatoryFields({ onClose }) {
  return (
    <div className="coverPanel">
      <div className="actionPanel">
        <h1>
          Bitte füllen Sie die folgenden Pflichtfelder aus: Von, Bis, Leute und
          Aktuelle Sorte.
        </h1>
        <button className="panelBtn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default MandatoryFields;
