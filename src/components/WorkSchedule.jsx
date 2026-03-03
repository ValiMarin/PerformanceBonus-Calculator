import { useState } from "react";
import TimeInterval from "./TimeInterval";

function WorkSchedule({ von, bis, setVon, setBis, sameTimeAllPeople }) {
  const [inputValue, setInputValue] = useState([
    "Spender",
    "Schneider",
    "Einleger",
    "Peller",
  ]);

  const updateInput = (value, index) => {
    const update = [...inputValue];
    update[index] = value;
    setInputValue(update);
  };

  function capitalizeIfLower(value, index) {
    if (!value) return;

    const firstChar = value[0];
    if (firstChar >= "a" && firstChar <= "z") {
      value = firstChar.toUpperCase() + value.slice(1);
      const update = [...inputValue];
      update[index] = value;
      setInputValue(update);
    }
  }

  const updateVon = (value, index) => {
    const update = [...von];
    update[index] = value;
    setVon(update);
  };

  const updateBis = (value, index) => {
    const update = [...bis];
    update[index] = value;
    setBis(update);
  };

  return (
    <div
      style={{
        marginBottom: "2vh",
        display: "flex",
        flexDirection: "column",
        gap: "0.5vh",
      }}
    >
      {(sameTimeAllPeople === true || sameTimeAllPeople === "questionNo") && (
        <div className="workScheduleDiv">
          <label
            style={{
              display: "block",
              textAlign: "center",
            }}
          >
            Arbeitszeit
          </label>

          <TimeInterval
            von={von[0] ?? ""}
            bis={bis[0] ?? ""}
            updateVon={(value) => updateVon(value, 0)}
            updateBis={(value) => updateBis(value, 0)}
          />
        </div>
      )}

      {(sameTimeAllPeople === false || sameTimeAllPeople === "questionYes") &&
        von.map((item, index) => (
          <div className="workScheduleDiv" key={index}>
            <input
              className="customLabel"
              style={{
                textAlign: "center",
                width: "100%",
                height: "auto",
              }}
              type="text"
              maxLength={30}
              value={
                inputValue[index]
                  ? inputValue[index]
                  : "Mitarbeiter " + (index + 1)
              }
              onChange={(e) => updateInput(e.target.value, index)}
              onBlur={(e) => capitalizeIfLower(e.target.value, index)}
            />

            <TimeInterval
              von={item}
              bis={bis[index]}
              updateVon={(value) => updateVon(value, index)}
              updateBis={(value) => updateBis(value, index)}
            />
          </div>
        ))}
    </div>
  );
}

export default WorkSchedule;
