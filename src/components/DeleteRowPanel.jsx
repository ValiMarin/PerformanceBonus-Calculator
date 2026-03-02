function DeleteRowPanel({ onClose, rowSelected }) {
  return (
    <div className="coverPanel">
      <div className="actionPanel">
        <h1>Sind Sie sicher, dass Sie diese Zeile löschen möchten?</h1>

        <p className="resultSection">Name: {rowSelected.selectedLabel}</p>

        <div className="actionPanelBtns">
          <button className="panelBtn" onClick={() => onClose(true)}>
            Ja
          </button>
          <button className="panelBtn" onClick={() => onClose(false)}>
            Nein
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteRowPanel;
