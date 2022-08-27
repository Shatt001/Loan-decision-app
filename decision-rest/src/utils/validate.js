const constants = require("./constants");

const personExists = (persCode) => {
  const person = constants.PERSONS.findIndex((pers) => pers.personCode === Number(persCode));

  return person === -1
    ? "Such person does not exists in the system"
    : null;
};

const validAmount = (amount) => {
  if (
    amount > constants.MAX_LOAN_AMOUNT ||
    amount < constants.MIN_LOAN_AMOUNT
  ) {
    return `Loan request amount limits exceeded. Requested amount: ${amount}, limits: ${constants.MIN_LOAN_AMOUNT} - ${constants.MAX_LOAN_AMOUNT}.`;
  }
  return null;
};

const validPeriod = (period) => {
  if (
    period > constants.MAX_LOAN_PERIOD ||
    period < constants.MIN_LOAN_PERIOD
  ) {
    return `Loan request period limits exceeded. Requested period: ${period}, limits: ${constants.MIN_LOAN_PERIOD} - ${constants.MAX_LOAN_PERIOD}.`;
  }
  return null;
};

const invalidNumber = (param) => {
  if (typeof param === "number" && !Number.isNaN(param)) {
    return false;
  }

  return true;
};

exports.validateParams = (persCode, amount, period) => {
  if (!persCode) {
    return "Personal code is required";
  }

  if (!amount) {
    return "Loan amount is required";
  }

  if (!period) {
    return "Loan period is required";
  }

  const persCodeN = Number(persCode);
  const amountN = Number(amount);
  const periodN = Number(period);

  if (invalidNumber(persCodeN)) {
    return "Incorrect personal code";
  }

  if (invalidNumber(amountN)) {
    return "Incorrect loan amount";
  }

  if (invalidNumber(periodN)) {
    return "Incorrect loan period";
  }

  return (
    personExists(persCodeN) || validAmount(amountN) || validPeriod(periodN)
  );
}
