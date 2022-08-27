import React, { useState } from "react";
import { Alert, AlertTitle, styled, Grid, Typography, TextField, buttonClasses, alertClasses, SvgIcon } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { maxNumber, minNumber, required } from "../utils/helperFunctions";
import { decision } from "../restApi/decision";
import { MAX_LOAN_AMOUNT, MAX_LOAN_PERIOD, MIN_LOAN_AMOUNT, MIN_LOAN_PERIOD, serviceWait } from "../utils/constants";
import logo from "../assets/logo.svg";

const defaultServiceValues = {
  decision: null,
  maxAvailableAmount: null,
  proposalPeriod: null,
  requestedAmount: null,
};

const validateAmount = (value) => {
  return minNumber(MIN_LOAN_AMOUNT, value) || maxNumber(MAX_LOAN_AMOUNT, value) || required(value);
}

const validatePeriod = (value) => {
  return minNumber(MIN_LOAN_PERIOD, value) || maxNumber(MAX_LOAN_PERIOD, value) || required(value);
}
const validatePersonalCode = (value) => {
  return required(value);
}

const Container = styled("form")(({ theme }) => ({
  padding: theme.spacing(2),
  [`& .${buttonClasses.root}`]: {
    width: "20rem",
    fontSize: "1.8rem",
  },
  [`& .${alertClasses.root}`]: {
    width: "43rem",
  },
  [`& .${alertClasses.message}`]: {
    whiteSpace: "pre-line",
  },
  [`& .logo`]: {
    height: "4rem",
    cursor: "pointer",
  },
}));

const LoanApp = () => {
  const [values, setValues] = useState({
    loading: false,
    error: "",
    personalCode: "38909249986",
    amount: 4000,
    period: 24,
    ...defaultServiceValues,
  });

  const hasMaxAvailable = values.maxAvailableAmount && values.maxAvailableAmount !== values.requestedAmount;
  const hasPeriodProposal = values.proposalPeriod && values.proposalPeriod !== values.period;
  const hasAdditionalCond = hasMaxAvailable || hasPeriodProposal;

  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    let amountFieldError;
    let periodFieldError;
    let personalCodeFieldError;

    if (field === 'amount') {
      amountFieldError = validateAmount(newValue);
    } 

    if (field === 'period') {
      periodFieldError = validatePeriod(newValue);
    } 

    if (field === 'personalCode') {
      personalCodeFieldError = validatePersonalCode(newValue);
    } 

    setValues({ ...values, ...defaultServiceValues, [field]: newValue, amountFieldError, periodFieldError, personalCodeFieldError });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    decision(values.personalCode, values.amount, values.period)
      .then((res) =>
        setTimeout(() => {
          setValues({ ...values, ...res.data, loading: false });
        }, serviceWait)
      )
      .catch((res) => {
        setValues({ ...values, error: res.response.data });
      });
  };


  return (
    <Container onSubmit={handleSubmit}>
      <Grid container direction={"column"} rowSpacing={6}>
        <Grid item>
          <img src={logo} alt="logo" className="logo" onClick={() => window.location.reload(false)} />
        </Grid>
        <Grid item container justifyContent={"center"}>
          <Typography variant="h1" color={"primary"}>
            Loan decision maker
          </Typography>
        </Grid>
        <Grid item container justifyContent={"center"}>
          <Typography variant="body" color={"secondary"}>
            To make loan decision, please provide required data: personal code, loan amount, loan period in months.
          </Typography>
        </Grid>
        <Grid item container spacing={2} justifyContent={"center"}>
          <Grid item>
            <TextField
              value={values.personalCode}
              onChange={handleChange("personalCode")}
              required
              label="Personal code"
              variant="outlined"
              error={!!values.personalCodeFieldError}
              helperText={values.personalCodeFieldError}
            />
          </Grid>
          <Grid item>
            <TextField
              value={values.amount}
              onChange={handleChange("amount")}
              required
              label="Amount"
              variant="outlined"
              type={"number"}
              error={!!values.amountFieldError}
              helperText={values.amountFieldError}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>€</Typography>,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              value={values.period}
              onChange={handleChange("period")}
              required
              label="Period"
              variant="outlined"
              type={"number"}
              error={!!values.periodFieldError}
              helperText={values.periodFieldError}
            />
          </Grid>
        </Grid>
        {values.error && (
          <Grid item container justifyContent={"center"}>
            <Alert severity="error">{values.error}</Alert>
          </Grid>
        )}
        {values.decision && (
          <Grid item container justifyContent={"center"}>
            <Alert severity="success">
              <AlertTitle>Loan approved!</AlertTitle>
              {hasAdditionalCond ? `Additional conditions:` : undefined}
              {hasMaxAvailable
                ? `\nRequested amount ${values.requestedAmount} can be increased to ${values.maxAvailableAmount} for the same period `
                : undefined}
              {hasPeriodProposal
                ? `\nRequested amount ${values.requestedAmount} can also be issued for shorted period ${values.proposalPeriod} months `
                : undefined}
            </Alert>
          </Grid>
        )}
        {values.decision === false && (
          <Grid item container justifyContent={"center"}>
            <Alert severity="warning">
              <AlertTitle>Loan not approved!</AlertTitle>
              {hasAdditionalCond ? `Additional conditions:` : undefined}
              {hasMaxAvailable
                ? `\nDecrease your requested amount ${values.requestedAmount} to ${values.maxAvailableAmount} for the same period and loan will be available`
                : undefined}
              {hasPeriodProposal
                ? `\nRequested amount ${values.requestedAmount} can also be available for longer period ${values.proposalPeriod} months `
                : undefined}
            </Alert>
          </Grid>
        )}
        <Grid item container justifyContent={"center"}>
          <LoadingButton variant="outlined" size="large" color="secondary" type="submit" loading={values.loading}>
            decision
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoanApp;
