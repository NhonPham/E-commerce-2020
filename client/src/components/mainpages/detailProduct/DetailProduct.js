import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import styled from "styled-components";

export default function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;
  const {
    title,
    product_id,
    price,
    description,
    content,
    sold,
    category,
  } = detailProduct;
  return (
    <DetailProductWrapper>
      <div className="cart-detail detail ">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{title}</h2>
            <h6>Code: {product_id}</h6>
          </div>
          <span>${price}</span>
          <p>{description}</p>
          <p>{content}</p>
          <p>Sold: {sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div className="related">
        <h2>Related Products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </DetailProductWrapper>
  );
}

const DetailProductWrapper = styled.div`
  .cart-detail {
    position: relative;
    border: 1px solid #ccc;
    transform: scaleY(0.98);
    top: 5rem;
  }
  .detail {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 50px;
    font-size: 150%;
  }

  .detail img {
    max-width: 400px;
    width: 100%;
    height: 450px;
    margin: 20px;
    object-fit: cover;
    display: block;
  }

  .box-detail {
    max-width: 500px;
    width: 100%;
    margin: 5px 20px;
  }

  .box-detail .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .box-detail h2 {
    text-transform: uppercase;
    color: darkblue;
    letter-spacing: 2px;
    font-weight: 2rem;
  }

  .box-detail p {
    line-height: 1.5;
    margin: 10px 0;
    opacity: 0.8;
  }

  .box-detail .cart {
    background: #333;
    color: white;
    margin-top: 10px;
    padding: 10px 25px;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .related {
    padding-top: 5rem;
  }
  .products {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    justify-content: center;
    margin: 20px 0;
  }
`;
