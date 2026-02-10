import { useState } from "react";
import { useEffect } from "react";

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
      return [...products, { label: "", crates: "", coefficient: "" }];
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
      if (!isNaN(i.crates) && !isNaN(i.coefficient)) {
        result += i.crates * i.coefficient;
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
    <div className="CalculationSection">
      <h1>Completed Production</h1>

      <div className="divProduct">
        {products.map((input, index) => (
          <div className="divProductRow" key={index}>
            <label>{index + 1}.</label>
            <input
              type="number"
              placeholder="Total crates"
              value={input.crates}
              onChange={(e) => newValues(index, "crates", e.target.value)}
            />
            <input
              type="number"
              placeholder="Prod-coefficient"
              value={input.coefficient}
              onChange={(e) => newValues(index, "coefficient", e.target.value)}
            />
          </div>
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

      <p>Total: {totalCP}</p>
    </div>
  );
}

export default CompletedProduction;
