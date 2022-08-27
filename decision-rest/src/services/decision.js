const { calcDecision } = require("../utils/calculations");
const { validateParams } = require("../utils/validate");

exports.getDecision = (persCode, amount, period) => {
  const error = validateParams(persCode, amount, period);

  if (error) {
    return { error };
  }

  const decision = calcDecision(Number(persCode), Number(amount), Number(period));

  return { error, ...decision };
};
