function ETL_Row({
  index,
  name,
  amount,
  coefficient,
  people,
  updateETLValues,
  adjustName,
  sameTimeAllPeople,
  activateDeletePanel,
}) {
  return (
    <div className="rowDiv">
      <input
        className="customLabel"
        type="text"
        maxLength={18}
        value={name}
        onChange={(e) => updateETLValues(index, "name", e.target.value)}
        onBlur={(e) => adjustName(index, "name", e.target.value)}
      />

      <input
        type="number"
        placeholder="nr"
        maxLength={2}
        value={amount}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 0 || e.target.value === "") {
            const validInput = e.target.value.slice(0, 2);
            updateETLValues(index, "amount", validInput);
          }
        }}
      />
      <input
        type="number"
        placeholder="Koeffizient"
        value={coefficient}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 0 || e.target.value === "")
            updateETLValues(index, "coefficient", e.target.value);
        }}
      />

      {(sameTimeAllPeople === false || sameTimeAllPeople === "questionYes") && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <select
            value={people}
            onChange={(e) => updateETLValues(index, "people", e.target.value)}
            className="rowPeopleSelect"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>

          <span
            style={{
              position: "absolute",
              right: "0.2vw",
              top: "45%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            👥
          </span>
        </div>
      )}

      <button
        className="eraseRowBtn"
        onClick={() => activateDeletePanel(index, name)}
      >
        X
      </button>
    </div>
  );
}

export default ETL_Row;
