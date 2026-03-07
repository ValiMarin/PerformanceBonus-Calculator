function TC_Row({
  index,
  name,
  type,
  time,
  amount,
  people,
  updateValues,
  adjustName,
  activateDeletePanel,
  sameTimeAllPeople,
}) {
  return (
    <div className="rowDiv">
      <input
        className="customLabel"
        type="text"
        maxLength={18}
        value={name}
        onChange={(e) => updateValues(index, "name", e.target.value)}
        onBlur={(e) => adjustName(index, "name", e.target.value)}
      />

      {type !== "Gesamte Min" && (
        <label>
          {time}-Min
          {type === "nr" ? " ×" : ":"}
        </label>
      )}

      <input
        type={type === "checkbox" ? "checkbox" : "number"}
        className={type === "checkbox" ? "checkbox" : ""}
        placeholder={type}
        {...(type === "checkbox"
          ? {
              checked: amount,
              onChange: (e) => updateValues(index, "amount", e.target.checked),
            }
          : {
              value: type === "Gesamte Min" ? time : amount,
              onChange: (e) => {
                const val = Number(e.target.value);
                if (val >= 0 || e.target.value === "") {
                  const field = type === "Gesamte Min" ? "time" : "amount";
                  const validInput = e.target.value.slice(0, 3);
                  updateValues(index, field, validInput);
                }
              },
            })}
      />

      {(sameTimeAllPeople === false || sameTimeAllPeople === "questionYes") && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <select
            value={people}
            onChange={(e) => updateValues(index, "people", e.target.value)}
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

export default TC_Row;
