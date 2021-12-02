export const usdPlus = (number) => {
  if (isNaN(number)) return number;
  const options = {
    style: "currency",
    currency: "USD",
    signDisplay: "exceptZero",
  };
  return new Intl.NumberFormat("us-US", options).format(number);
};
export const usdNoPlus = (number) => {
  if (isNaN(number)) return number;
  const options = {
    style: "currency",
    currency: "USD",
  };
  return new Intl.NumberFormat("us-US", options).format(number);
};

export const numberWithCurrencySymbol = (number, currency) => {
  if (isNaN(number) || currency === "N/A") return number;
  const options = {
    style: "currency",
    currency,
  };
  return new Intl.NumberFormat("us-US", options).format(number);
};

export const percent = (number) => {
  if (isNaN(number)) return number;

  if (Math.abs(number) < 0.01 && number !== 0) {
    if (number > 0) {
      number = 0.01;
    } else number = -0.01;
  }
  const options = {
    style: "percent",
    signDisplay: "exceptZero",
    minimumFractionDigits: 2,
  };
  return new Intl.NumberFormat("en-GB", options).format(number / 100);
};

export const percentNoPlus = (number) => {
  if (isNaN(number)) return number;
  const options = {
    style: "percent",
    minimumFractionDigits: 2,
  };
  return new Intl.NumberFormat("en-GB", options).format(number / 100);
};
