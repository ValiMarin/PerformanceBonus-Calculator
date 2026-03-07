function CP_Row({ index, palets, crates, coefficient, newValues }) {
  return (
    <div className="divProductRow" key={index}>
      <label>{index + 1}.</label>
      <input
        type="number"
        placeholder="Paletten"
        value={palets}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 0 || e.target.value === "") {
            const validInput = e.target.value.slice(0, 2);
            newValues(index, "palets", validInput);
          }
        }}
      />
      <input
        type="number"
        placeholder="Kisten"
        value={crates}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 0 || e.target.value === "") {
            const validInput = e.target.value.slice(0, 4);
            newValues(index, "crates", validInput);
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
            newValues(index, "coefficient", e.target.value);
        }}
      />
    </div>
  );
}

export default CP_Row;
