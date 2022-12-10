const salaryCalculator = require("./salaryCalc.js");
const hourlyCalculator = require("./hourlyCalc.js");

// Salary Calculator
const ant = salaryCalculator(164000, "single");

// Hourly Calculator
const ant2 = hourlyCalculator(24, 85, "biweekly");
console.log(ant2);
