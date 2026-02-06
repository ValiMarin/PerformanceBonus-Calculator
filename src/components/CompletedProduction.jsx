function CompletedProduction({
  products,
  newValues,
  addProduct,
  deleteProduct,
  totalCP,
}) {
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
