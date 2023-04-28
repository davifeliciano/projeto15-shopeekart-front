const formatCurrency = (decimalStr) => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(decimalStr);
};

export default formatCurrency;
