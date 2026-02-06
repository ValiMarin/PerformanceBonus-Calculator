function Info({ onClose }) {
  return (
    <div className="infoPanel">
      <div className="infoTextHolder">
        <h1>Why to use & How to use</h1>

        <p className="infoText">
          &nbsp;&nbsp;This calculator is designed for a packing factory and
          calculates the quantity of product that needs to be completed in order
          to earn a bonus (extra money). The factory has over 50 production
          lines, and each line has an employee who manually calculates this
          bonus. With this calculator, employees can easily determine the bonus
          by entering the required inputs.
          <br />
          <br /> &nbsp;&nbsp;<b>How to use!</b>
          <br /> The employee has to complete 3 main sections:
          <br />
          <br />
          &nbsp;&nbsp; 1. <b>Time Calculator –</b> calculates the total working
          time based on how many people are assigned to that line and subtracts
          unexpected time loss.
          <br /> <br />
          &nbsp;&nbsp; <b>2. Expected Time Loss –</b> calculates every expected
          action that may occur (e.g., label roll change, plastic roll change,
          etc.). Each action has a specific line coefficient that multiplies the
          action time. All actions are then summed and multiplied by the number
          of people. This result is multiplied again by 1.35, because to earn
          the bonus, the line must produce at 135% capacity.
          <br /> <br />
          &nbsp;&nbsp; 3. <b>Completed Production – </b>represents orders that
          have already been completed by the employees. Each order includes the
          number of crates produced and a specific coefficient for each product.
          The calculation involves summing all products, where the number of
          crates for each product is multiplied by its corresponding
          coefficient.
          <br /> <br />
          &nbsp;&nbsp; After completing all three sections, the employee must
          enter the current coefficient in the 'Last Product' field, then press
          'Calculate' to determine the quantity that needs to be produced to
          complete the bonus.
        </p>

        <button className="infoOkBtn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Info;
