import { useState, useEffect } from "react";
import LanguagesPanel from "../LanguagesPanel";

function CostumizedRow({ onClose, newRowName, language, setLanguage }) {
  const titlesFirst = [
    "Bitte Elementtyp auswählen!",
    "Vă rugăm să selectați tipul elementului!",
    "Please select the element type!",
    "Пожалуйста, выберите тип элемента!",
  ];

  const titlesSecond = [
    "Wie viele Minuten möchten Sie diesem Element zuweisen?",
    "Câte minute doriti sa acordati acestui element?",
    "How many minutes do you want to assign to this element?",
    "Сколько минут вы хотите выделить этому элементу?",
  ];

  const doneBtn = ["Fertig", "Terminat", "Done", "Готово"];

  const [title, setTitle] = useState(titlesFirst[language]);
  const [type, setType] = useState();
  const [panel, setPanelVisibility] = useState("first");
  const [time, setTime] = useState("");

  const chooseType = (type) => {
    setType(type);
    setPanelVisibility("second");
    setTitle(titlesSecond[language]);

    if (type === "Gesamte Min") onClose("", 1, type);
  };

  const chooseTime = () => {
    if (type === "checkbox") {
      onClose(time, false, type);
      return;
    }

    onClose(time, "", type);
  };

  useEffect(() => {
    if (panel === "first") {
      setTitle(titlesFirst[language]);
      return;
    }

    setTitle(titlesSecond[language]);
  }, [language]);

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
              {doneBtn[language]}
            </button>
          </div>
        )}
      </div>

      <LanguagesPanel setLanguage={setLanguage} />
    </div>
  );
}

export default CostumizedRow;
