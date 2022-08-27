const maxNumber = (maxValue, currValue) => {
    if (currValue > maxValue) {
      return "Max value is " + maxValue;
    };

    return "";
};

const minNumber = (minValue, currValue) => {
  if (currValue < minValue) {
    return "Min value is " + minValue;
  };

  return '';
};

const required = (value) => {
  if (!value || value.length === 0) {
    return `Required field`;
  }

  return '';
};

export { required, minNumber, maxNumber };