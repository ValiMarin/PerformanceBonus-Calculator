import deFlag from "../flags/de.svg";
import roFlag from "../flags/ro.svg";
import gbFlag from "../flags/gb.svg";
import ruFlag from "../flags/ru.svg";

function LanguagesPanel({ setLanguage, verticalPosition, horizontalPosition }) {
  function changeLanguage(newLanguage) {
    setLanguage(newLanguage);
  }
  return (
    <div
      className="leanguageDiv"
      style={{ top: verticalPosition + "%", left: horizontalPosition + "%" }}
    >
      <button className="flagBtn" onClick={() => changeLanguage(0)}>
        <img
          src={deFlag}
          alt="German"
          style={{ width: "3vw", height: "3vw" }}
        />
      </button>
      <button className="flagBtn" onClick={() => changeLanguage(1)}>
        <img
          src={roFlag}
          alt="Romanian"
          style={{ width: "3vw", height: "3vw" }}
        />
      </button>
      <button className="flagBtn" onClick={() => changeLanguage(2)}>
        <img
          src={gbFlag}
          alt="English"
          style={{ width: "3vw", height: "3vw" }}
        />
      </button>
      <button className="flagBtn" onClick={() => changeLanguage(3)}>
        <img
          src={ruFlag}
          alt="Russian"
          style={{ width: "3vw", height: "3vw" }}
        />
      </button>
    </div>
  );
}

export default LanguagesPanel;
