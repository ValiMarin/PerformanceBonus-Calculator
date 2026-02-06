function MandatoryFields({ onClose }) {
  return (
    <div className="infoPanel">
      <div className="mandatoryFieldsPanel">
        <h1>
          Please complete the following required fields: Working Hours, People,
          and Last Product.
        </h1>
        <button className="infoOkBtn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default MandatoryFields;
