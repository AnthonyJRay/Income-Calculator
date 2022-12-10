const taxRate = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
const standardDeduction = {
  single: 13850,
  joint: 27700,
  headOfHousehold: 20800,
};
const incomeBrackets = {
  single: [10275, 41775, 89075, 170051, 215950, 323925],
  joint: [20550, 83550, 178150, 340100, 431900, 647850],
};

module.exports = function taxCalculator(income, filingStatus) {
  let taxableIncome = income - standardDeduction[filingStatus];
  let taxPayable = 0;
  let taxBracket;
  let marginalTaxRate = 0;
  let effectiveTaxRate = 0;

  // Determine tax bracket
  if (filingStatus === "single") {
    taxBracket = incomeBrackets.single;
  } else if (filingStatus === "joint") {
    taxBracket = incomeBrackets.joint;
  }

  // If no income, return
  if (taxableIncome <= 0) {
    return "You didn't earn any money this year.";

    // First tax bracket
  } else if (taxableIncome <= taxBracket[0]) {
    taxPayable += taxableIncome * taxRate[0];
    marginalTaxRate = taxRate[0];

    // Second tax bracket
  } else if (taxableIncome <= taxBracket[1]) {
    taxPayable += taxBracket[0] * taxRate[0];
    taxPayable += (taxableIncome - taxBracket[0]) * taxRate[1];
    marginalTaxRate = taxRate[1];

    // Third tax bracket
  } else if (taxableIncome <= taxBracket[2]) {
    taxPayable += taxBracket[0] * taxRate[0];
    taxPayable += (taxBracket[1] - taxBracket[0]) * taxRate[1];
    taxPayable += (taxableIncome - taxBracket[1]) * taxRate[2];
    marginalTaxRate = taxRate[2];

    // Fourth tax bracket
  } else if (taxableIncome <= taxBracket[3]) {
    taxPayable += taxBracket[0] * taxRate[0];
    taxPayable += (taxBracket[1] - taxBracket[0]) * taxRate[1];
    taxPayable += (taxBracket[2] - taxBracket[1]) * taxRate[2];
    taxPayable += (taxableIncome - taxBracket[2]) * taxRate[3];
    marginalTaxRate = taxRate[3];

    // Fifth tax bracket
  } else if (taxableIncome <= taxBracket[4]) {
    taxPayable += taxBracket[0] * taxRate[0];
    taxPayable += (taxBracket[1] - taxBracket[0]) * taxRate[1];
    taxPayable += (taxBracket[2] - taxBracket[1]) * taxRate[2];
    taxPayable += (taxBracket[3] - taxBracket[2]) * taxRate[3];
    taxPayable += (taxableIncome - taxBracket[3]) * taxRate[4];
    marginalTaxRate = taxRate[4];

    // Sixth tax bracket
  } else if (taxableIncome <= taxBracket[5]) {
    taxPayable += taxBracket[0] * taxRate[0];
    taxPayable += (taxBracket[1] - taxBracket[0]) * taxRate[1];
    taxPayable += (taxBracket[2] - taxBracket[1]) * taxRate[2];
    taxPayable += (taxBracket[3] - taxBracket[2]) * taxRate[3];
    taxPayable += (taxBracket[4] - taxBracket[3]) * taxRate[4];
    taxPayable += (taxableIncome - taxBracket[4]) * taxRate[5];
    marginalTaxRate = taxRate[5];

    // Seventh tax bracket
  } else {
    taxPayable += taxBracket[0] * taxRate[0];
    taxPayable += (taxBracket[1] - taxBracket[0]) * taxRate[1];
    taxPayable += (taxBracket[2] - taxBracket[1]) * taxRate[2];
    taxPayable += (taxBracket[3] - taxBracket[2]) * taxRate[3];
    taxPayable += (taxBracket[4] - taxBracket[3]) * taxRate[4];
    taxPayable += (taxBracket[5] - taxBracket[4]) * taxRate[5];
    taxPayable += (taxableIncome - taxBracket[5]) * taxRate[6];
    marginalTaxRate = taxRate[6];
  }
  effectiveTaxRate = (taxPayable * 100) / taxableIncome;
  marginalTaxRate = marginalTaxRate * 100;

  return {
    taxLiability: taxPayable.toFixed(2),
    marginalRate: marginalTaxRate.toFixed(2),
    effectiveRate: effectiveTaxRate.toFixed(2),
  };
};
