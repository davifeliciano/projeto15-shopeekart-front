import axios from "axios";
import styled from "styled-components";
import { BsCartPlus } from "react-icons/bs";
import Header from "../components/Header";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useTheme from "../hooks/useTheme";
import formatCurrency from "../utils/formatCurrency";
import Counter from "../components/Counter";
import { CartContext } from "../contexts/CartContext";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [orderCount, setOrderCount] = useState(1);
  const { cart, setCart } = useContext(CartContext);
  const { colors } = useTheme();
  const discountPercent = useRef("0");
  const formattedRetailPrice =
    product.retailPrice && formatCurrency(product.retailPrice.$numberDecimal);
  const formattedDiscountedPrice =
    product.discountedPrice &&
    formatCurrency(product.discountedPrice.$numberDecimal);

  useEffect(() => {
    axios
      .get(`/product/${id}`)
      .then((res) => {
        const product = res.data;
        setProduct(product);
        const retailPrice = parseFloat(product.retailPrice.$numberDecimal);
        const discountedPrice = parseFloat(
          product.discountedPrice.$numberDecimal
        );
        discountPercent.current = (
          (100 * (retailPrice - discountedPrice)) /
          retailPrice
        ).toFixed(0);
      })
      .catch(console.error);
  }, [id]);

  function addProductToCart() {
    const cartCopy = [...cart];
    const item = cartCopy.find((item) => item.product._id === id);

    if (item) {
      item.count += orderCount;
      setCart(cartCopy);
    } else {
      setCart([...cart, { count: orderCount, product }]);
    }

    return navigate("/cart", { replace: true });
  }

  return (
    <>
      <Header />
      <PageContainer>
        <ProductDetailsContainer>
          <StyledCarousel
            colors={colors}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            stopOnHover={true}
          >
            {product.image?.map((src, index) => (
              <img key={index} src={src} alt={product.productName} />
            ))}
          </StyledCarousel>
          <ProductDetails>
            <h2>{product.productName}</h2>
            <PricesContainer colors={colors}>
              <span colors={colors} className="retail">
                {formattedRetailPrice}
              </span>
              <span colors={colors} className="discount">
                {formattedDiscountedPrice}
              </span>
              {discountPercent.current !== "0" && (
                <span colors={colors} className="discount-percent">
                  {`${discountPercent.current}% OFF`}
                </span>
              )}
            </PricesContainer>
            <AddToCartContainer>
              Quantity
              <CounterContainer>
                <Counter count={orderCount} setCount={setOrderCount} />
              </CounterContainer>
              <AddToCartButton colors={colors} onClick={addProductToCart}>
                <BsCartPlus />
                Add Product To Cart
              </AddToCartButton>
            </AddToCartContainer>
            <ProductDescription>
              <h3>Description</h3>
              <p>{product.description}</p>
            </ProductDescription>
          </ProductDetails>
        </ProductDetailsContainer>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 10px;
  margin-inline: 50px;
  padding: 1em;
  min-width: 1000px;
  background-color: white;
  border-radius: 3px;
`;

const ProductDetailsContainer = styled.div`
  display: flex;
  gap: 1em;
`;

const StyledCarousel = styled(Carousel)`
  width: 350px;
  height: 350px;
  min-width: 350px;
  min-height: 350px;
  background-color: white;
  border: 1px solid ${(props) => props.colors.primary};
  overflow: hidden;

  & img {
    aspect-ratio: 1 / 1;
    object-fit: scale-down;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  & h2 {
    font-weight: 500;
    font-size: 1.25rem;
  }
`;

const PricesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 15px 20px;
  background-color: ${(props) => props.colors.backgroundAside};
  border-radius: 3px;

  & span.retail {
    text-decoration: line-through;
  }

  & span.discount {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${(props) => props.colors.primary};
  }

  & span.discount-percent {
    padding: 3px;
    background-color: ${(props) => props.colors.primary};
    border-radius: 3px;
    color: white;
    font-size: 12px;
    font-weight: 700;
  }
`;

const AddToCartContainer = styled.div`
  display: flex;
  gap: 1em;
  justify-content: flex-end;
  align-items: center;
`;

const CounterContainer = styled.div`
  height: 32px;
`;

const AddToCartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 280px;
  height: 48px;
  background-color: ${(props) => props.colors.addToCartBg};
  border: 1px solid ${(props) => props.colors.primary};
  border-radius: 3px;
  color: ${(props) => props.colors.primary};
  font-size: 1.1rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.colors.addToCartHoverBg};
  }

  & svg {
    height: 100%;
    width: 20px;
  }
`;

const ProductDescription = styled.div`
  & h3 {
    margin-bottom: 1em;
    font-weight: 500;
    font-size: 1rem;
  }

  & p {
    line-height: 1.5;
  }
`;

export default Product;
