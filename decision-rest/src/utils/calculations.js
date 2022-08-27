const constants = require("./constants");

exports.calcDecision = (persCode, amount, period) => {
  let maxAvailableAmount;

  const person = constants.PERSONS.find((pers) => pers.personCode === persCode);

  if (person.creditModifier === "debt") {
    return {
      requestedAmount: amount,
      maxAvailableAmount: null,
      proposalPeriod: null,
      decision: false,
    };
  }

  const creditScore = (person.creditModifier / amount) * period;

  if (creditScore < 1) {
    maxAvailableAmount = person.creditModifier * period;
    proposalPeriod = Math.ceil(amount / person.creditModifier);

    return {
      requestedAmount: amount,
      maxAvailableAmount: maxAvailableAmount >= constants.MIN_LOAN_AMOUNT ? maxAvailableAmount : null,
      proposalPeriod: proposalPeriod <= constants.MAX_LOAN_PERIOD ? proposalPeriod : null,
      decision: false,
    };
  }

  maxAvailableAmount = person.creditModifier * period;
  proposalPeriod = Math.ceil(amount / person.creditModifier);

  return {
    requestedAmount: amount,
    maxAvailableAmount: maxAvailableAmount <= constants.MAX_LOAN_AMOUNT ? maxAvailableAmount : constants.MAX_LOAN_AMOUNT,
    proposalPeriod: proposalPeriod > constants.MIN_LOAN_PERIOD ? proposalPeriod : constants.MIN_LOAN_PERIOD,
    decision: true,
  };
};
