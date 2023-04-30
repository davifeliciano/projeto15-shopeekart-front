const sumCart = (cart) => {
  return cart
    .reduce((acc, cur) => {
      const price = parseFloat(cur.product.discountedPrice.$numberDecimal);
      const total = cur.count * price;
      return acc + total;
    }, 0)
    .toFixed(2);
};

export default sumCart;
