import { useState, useEffect } from "react";
import CP_Row from "./CP_Row";

function CompletedProduction({
  calculateTrigger,
  resetTrigger,
  totalCP,
  setTotalCP,
}) {
  const [products, setNewProduct] = useState([]);

  const addProduct = () => {
    setNewProduct((lastState) => {
      if (lastState.length >= 9) {
        return lastState;
      }
      return [
        ...products,
        { label: "", palets: "", crates: "", coefficient: "" },
      ];
    });
  };

  const deleteProduct = () => {
    setNewProduct((lastState) => lastState.slice(0, -1));
  };

  const newValues = (index, inputs, value) => {
    const newProduct = [...products];
    newProduct[index][inputs] = value;
    setNewProduct(newProduct);
  };

  function calculateCP() {
    let result = 0;
    products.forEach((i) => {
      const palets = Number(i.palets);
      const crates = Number(i.crates);
      const coefficient = Number(i.coefficient);

      if (!isNaN(palets) && !isNaN(crates) && !isNaN(coefficient)) {
        result += (palets * 32 + crates) * coefficient;
      }
    });

    setTotalCP(Math.floor(result));
  }

  function reset() {
    setNewProduct([]);
  }

  useEffect(() => {
    if (calculateTrigger) {
      calculateCP();
    }
  }, [calculateTrigger]);

  useEffect(() => {
    if (resetTrigger) {
      reset();
    }
  }, [resetTrigger]);

  return (
    <div className="CompetedProduction">
      <h1>Fertige Sorten</h1>

      <div className="divProduct">
        {products.map((input, index) => (
          <CP_Row
            index={index}
            palets={input.palets}
            crates={input.crates}
            coefficient={input.coefficient}
            newValues={newValues}
          />
        ))}
      </div>

      <div className="divProductionBtns">
        <button className="productionBtns" onClick={addProduct}>
          +
        </button>
        <button className="productionBtns" onClick={deleteProduct}>
          -
        </button>
      </div>

      <p className="resultSection">Gesamt: {totalCP}</p>
    </div>
  );
}

export default CompletedProduction;
