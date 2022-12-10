module.exports = function hourlyCalculator(wage, hours, basis) {
  let basisHours;
  let basisWeeks;
  let overtime = 0;
  let totalWage;
  let yearlyWage;

  if (basis === "weekly") {
    basisHours = 40;
    basisWeeks = 52;
  } else if (basis === "biweekly") {
    basisHours = 80;
    basisWeeks = 26;
  }

  // Check if overtime
  if (hours > basisHours) {
    overtime = hours - basisHours;
  }

  // If overtime, calculate total wage + overtime
  if (overtime) {
    totalWage = wage * basisHours + wage * 1.5 * overtime;
    console.log(`You worked ${overtime} hours of overtime.`);
  } else {
    // If no overtime, calculate total wage
    totalWage = wage * hours;
    console.log("You didn't work any overtime");
  }

  yearlyWage = totalWage * basisWeeks;

  // if (basis === "weekly") {
  //   yearlyWage = totalWage * 52;
  //   return totalWage;
  // } else if (basis === "biweekly") {
  //   yearlyWage = totalWage * 26;
  //   return totalWage * 2;
  // }

  return {
    overtime,
    totalWage,
    yearlyWage,
  };
};
