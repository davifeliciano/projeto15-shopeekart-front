import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import formatCurrency from "../utils/formatCurrency";

const ProductCard = ({ product }) => {
  const { colors } = useTheme();
  const discountPrice = formatCurrency(product.discountedPrice.$numberDecimal);
  const retailPrice = formatCurrency(product.retailPrice.$numberDecimal);

  return (
    <Container colors={colors}>
      <img src={product.image?.at(0)} alt={product.productName} />
      <ProductDetail>
        <h2>{product.productName}</h2>
        {product.brand && <Brand>{product.brand}</Brand>}
        <PricesContainer>
          <div>
            <Price colors={colors} className="discount">
              {retailPrice}
            </Price>{" "}
            <Price colors={colors}>{discountPrice}</Price>
          </div>
        </PricesContainer>
      </ProductDetail>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 3px;

  & img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: scale-down;
  }

  &:hover {
    border-color: ${(props) => props.colors.backgroundDownHeader};
  }
`;

const ProductDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1em;
  padding: 10px;
  overflow: hidden;

  & h2 {
    flex: 1;
  }
`;

const PricesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  color: ${(props) => props.colors.backgroundDownHeader};

  &.discount {
    color: inherit;
    text-decoration: line-through;
  }
`;

const Brand = styled.div`
  width: fit-content;
  padding: 5px;
  color: white;
  background-color: #00000099;
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.15));
  border-radius: 10px;
  font-size: 13px;
`;

export default ProductCard;
