import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import formatCurrency from "../utils/formatCurrency";
import { Link } from "react-router-dom";

const OrderItem = ({ product, count }) => {
  const { colors } = useTheme();

  const retailPrice = product.retailPrice.$numberDecimal;
  const discountedPrice = product.discountedPrice.$numberDecimal;
  const total = (count * parseFloat(discountedPrice)).toFixed(2);
  const formattedRetailPrice = formatCurrency(retailPrice);
  const formattedDiscountedPrice = formatCurrency(discountedPrice);
  const formattedTotal = formatCurrency(total);

  return (
    <Container colors={colors}>
      <Link to={`/product/${product._id}`}>
        <img src={product.image?.at(0)} alt={product.productName} />
      </Link>
      <Detail>
        <Link to={`/product/${product._id}`}>
          <h2>{product.productName}</h2>
        </Link>
        <PriceAndQuantity>
          <PriceContainer textAbove="Unit Price">
            <Price colors={colors} className="discount">
              {formattedRetailPrice}
            </Price>{" "}
            <Price colors={colors}>{formattedDiscountedPrice}</Price>
          </PriceContainer>
          <PriceContainer textAbove="Total">
            <Price colors={colors} className="retail">
              {formattedTotal}
            </Price>
          </PriceContainer>
        </PriceAndQuantity>
      </Detail>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1em;
  height: 64px;
  padding: 1em;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 3px;
  position: relative;

  & img {
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: scale-down;
  }
`;

const Detail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h2 {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const PriceAndQuantity = styled.div`
  display: flex;
  gap: 20px;

  & span.quantity {
    font-size: small;
  }
`;

const PriceContainer = styled.div`
  &::before {
    content: "${(props) => props.textAbove}";
    position: relative;
    left: 50%;
    top: -100%;
    transform: translate(100%, -100%);
    font-size: small;
  }
`;

const Price = styled.span`
  color: ${(props) => props.colors.primary};

  &.discount {
    color: inherit;
    text-decoration: line-through;
  }
`;

export default OrderItem;
