function TimeInterval({ von, bis, updateVon, updateBis }) {
  return (
    <div className="rowDiv" style={{ gap: "1vw" }}>
      <label>
        Von:
        <input
          type="time"
          value={von}
          onChange={(e) => updateVon(e.target.value)}
        />
      </label>

      <label>
        Bis:
        <input
          type="time"
          value={bis}
          onChange={(e) => updateBis(e.target.value)}
        />
      </label>
    </div>
  );
}

export default TimeInterval;
