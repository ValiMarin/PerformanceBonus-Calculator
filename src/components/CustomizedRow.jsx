import { useState } from "react";

function CostumizedRow({ onClose, newRowName }) {
  const [title, setTitle] = useState("Bitte Elementtyp auswählen!");
  const [type, setType] = useState();
  const [panel, setPanelVisibility] = useState("first");
  const [time, setTime] = useState("");

  const chooseType = (type) => {
    setType(type);
    setPanelVisibility("second");
    setTitle("Wie viele Minuten werden bei aktivem Element berücksichtigt?");

    if (type === "Gesamte Min") onClose("", 1, type);
  };

  const chooseTime = () => {
    if (type === "checkbox") {
      onClose(time, false, type);
      return;
    }

    onClose(time, "", type);
  };

  return (
    <div className="coverPanel">
      <div className="actionPanel">
        <h1>{title}</h1>

        {panel === "first" && (
          <div className="choiceColumn" style={{ width: "auto" }}>
            <div
              className="elementType"
              onClick={() => chooseType("Gesamte Min")}
            >
              <label style={{ flexWrap: "wrap" }}>
                {newRowName}
                <input
                  type="number"
                  placeholder="Gesamte Min"
                  style={{ pointerEvents: "none" }}
                  disabled
                />
              </label>
            </div>
            <div className="elementType" onClick={() => chooseType("checkbox")}>
              <label style={{ flexWrap: "wrap" }}>
                {newRowName}
                <input
                  className="checkbox"
                  type="checkbox"
                  style={{ pointerEvents: "none" }}
                  checked={true}
                  disabled
                />
              </label>
            </div>
            <div className="elementType" onClick={() => chooseType("nr")}>
              <label style={{ flexWrap: "wrap" }}>
                {newRowName}
                <input
                  type="number"
                  placeholder="nr"
                  style={{ pointerEvents: "none" }}
                  disabled
                />
              </label>
            </div>
          </div>
        )}

        {panel === "second" && (
          <div
            className="actionPanel"
            style={{ border: "rgba(33, 33, 33, 0)", width: "auto" }}
          >
            <input
              className="newCustomRowInput"
              type="number"
              placeholder="Gesamte Min"
              value={time}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || Number(val) >= 0) {
                  setTime(val);
                }
              }}
            />
            <button
              className="panelBtn"
              disabled={time === "" || Number(time) === 0}
              onClick={() => chooseTime(time)}
            >
              Ende
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CostumizedRow;
