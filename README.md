# Performance Bonus Calculator

This calculator was developed based on the production processes at Westfälischen Fleischwarenfabrik Stockmeyer GmbH and is used to calculate the production quantity required to reach the Prämie bonus. The factory has many Verpackum packing lines, where each line has a responsible employee who previously calculated the bonus manually. With this tool, employees can quickly, consistently and transparently calculate the required production quantity by simply entering the relevant data.

---

## 🚀 Live Version  
👉 https://valimarin.github.io/PerformanceBonus-Calculator/

---

## 📌 What This Calculator Does

This tool helps factory employees determine how much they must still produce to reach the bonus threshold.  
By completing a few required fields, the calculator automatically computes:

- Total productive time  
- Expected time losses  
- Completed production so far  
- Final quantity required to achieve the bonus  

All calculations follow the internal factory logic and coefficients used by production teams.

---

## 🧩 How It Works  
The employee must complete **three main sections**, each with its own calculation logic:

---

### **1. Time Calculator**  
Calculates the **total working time** based on:
- The number of people assigned to that line  
- Unexpected time loss  

This gives the actual available production time.

---

### **2. Expected Time Loss**  
Calculates all **planned actions** that reduce production time, such as:
- Label roll changes  
- Plastic roll changes  
- Other line-specific operations  

Each action has:
- A **time value**
- A **line coefficient**
- A multiplication by the **number of people**
- A final multiplication by **1.35**, because the line must operate at **135%** to qualify for the bonus

The result is the total expected lost time.

---

### **3. Completed Production**  
Considers all orders already produced.  
Each order includes:
- Number of crates completed  
- A specific coefficient depending on the product  

The calculator multiplies crates × coefficient for each product and then sums the results.

---

### **Final Step**
After completing all three sections, the employee enters the current coefficient in the **“Last Product”** field and clicks **Calculate**.  

The calculator then determines the **exact quantity of product that must still be produced** to earn the bonus.

---

## 🛠️ Technologies Used
- **React.js**
- **JavaScript (ES6)**
- **HTML5 / CSS3**
- **GitHub Pages** (deployment)

1. **Clone the repository**
   ```bash
   git clone https://github.com/ValiMarin/PerformanceBonus-Calculator.git
