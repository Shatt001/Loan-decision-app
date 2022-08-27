import axios from "axios";

export const decision = async (persCode, amount, period) => {
  let result = {};
  const url = `/api/getDecision?persCode=${persCode}&amount=${amount}&period=${period}`;

  await axios
    .get(url)
    .then((response) => {
      result = response;
    })
    .catch((err) => {
      throw err;
    });

  return result;
};
