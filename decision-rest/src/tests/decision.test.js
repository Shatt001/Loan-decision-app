const { getDecision } = require("../services/decision");

test("Approved loan request", () => {
  expect(getDecision("49002010998", "2500", "24")).toEqual({
    error: null,
    requestedAmount: 2500,
    maxAvailableAmount: 7200,
    proposalPeriod: 12,
    decision: true,
  });
});

test("Approved loan request with max available amount 10000", () => {
  expect(getDecision("49002010998", "4000", "36")).toEqual({
    error: null,
    requestedAmount: 4000,
    maxAvailableAmount: 10000,
    proposalPeriod: 14,
    decision: true,
  });
});

test("Person does not exists", () => {
  expect(getDecision("111111", "2500", "24")).toEqual({
    error: "Such person does not exists in the system",
  });
});

test("Loan request not approved because of debt", () => {
  expect(getDecision("49002010965", "2500", "24")).toEqual({
    error: null,
    requestedAmount: 2500,
    maxAvailableAmount: null,
    proposalPeriod: null,
    decision: false,
  });
});

test("Loan request not approved because of too large amount request with available proposal", () => {
  expect(getDecision("49002010976", "2500", "24")).toEqual({
    error: null,
    requestedAmount: 2500,
    maxAvailableAmount: 2400,
    proposalPeriod: 25,
    decision: false,
  });
});

test("Loan request not approved because of too large amount request without available proposal", () => {
  expect(getDecision("49002010976", "10000", "24")).toEqual({
    error: null,
    requestedAmount: 10000,
    maxAvailableAmount: 2400,
    proposalPeriod: null,
    decision: false,
  });
});

test("Loan request not approved because of too large amount request without max available amount for period", () => {
  expect(getDecision("49002010975", "2000", "12")).toEqual({
    error: null,
    requestedAmount: 2000,
    maxAvailableAmount: null,
    proposalPeriod: 40,
    decision: false,
  });
});

test("Loan request amount limits exceeded. Requested amount: 12000, limits: 2000 - 10000.", () => {
  expect(getDecision("49002010975", "12000", "24")).toEqual({
    error: "Loan request amount limits exceeded. Requested amount: 12000, limits: 2000 - 10000.",
  });
});

test("Loan request period limits exceeded. Requested period: 5, limits: 12 - 60.", () => {
  expect(getDecision("49002010975", "6000", "5")).toEqual({
    error: "Loan request period limits exceeded. Requested period: 5, limits: 12 - 60.",
  });
});

test("Wrong personal code parameter type format", () => {
  expect(getDecision("49002010975a", "6000", "12")).toEqual({
    error: "Incorrect personal code",
  });
});

test("Wrong loan amountparameter type format", () => {
  expect(getDecision("49002010975", "6000a", "12")).toEqual({
    error: "Incorrect loan amount",
  });
});

test("Wrong loan period parameter type format", () => {
  expect(getDecision("49002010975", "6000", "12a")).toEqual({
    error: "Incorrect loan period",
  });
});

test("Personal code is required", () => {
  expect(getDecision(null, "6000", "12")).toEqual({
    error: "Personal code is required",
  });
});

test("Loan amount is required", () => {
  expect(getDecision(49002010975, null, "12")).toEqual({
    error: "Loan amount is required",
  });
});

test("Loan period is required", () => {
  expect(getDecision(49002010975, 3000, null)).toEqual({
    error: "Loan period is required",
  });
});
