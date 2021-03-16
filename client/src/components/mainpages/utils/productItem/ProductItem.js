import React from "react";
import BtnRender from "./BtnRender";
import styled from "styled-components";

export default function ProductItem({
  product,
  isAdmin,
  deleteProduct,
  handleCheck,
}) {
  return (
    <ProducItemWrapper>
      <div className="product-card">
        {isAdmin && (
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => handleCheck(product._id)}
          />
        )}
        <img src={product.images.url} alt="" />

        <div className="product-box">
          <h2 title={product.title}>{product.title}</h2>
          <span>${product.price}</span>
          <p>{product.description}</p>
        </div>

        <BtnRender product={product} deleteProduct={deleteProduct} />
      </div>
    </ProducItemWrapper>
  );
}

const ProducItemWrapper = styled.div`
  .product-card {
    max-width: 300px;
    overflow: hidden;
    height: 500px;
    padding: 15px;
    box-shadow: 0 0 15px #ddd;
    margin: 10px 0;
    position: relative;
  }

  .product-card img {
    width: 100%;
    height: 300px;
    display: block;
    object-fit: cover;
  }

  .product-box h2 {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-transform: capitalize;
    cursor: pointer;
    color: #323232;
  }

  .product-card span {
    color: crimson;
  }

  .product-box p {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 70px;
    overflow: hidden;
    color: #323232;
  }

  .row-btn {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .row-btn a {
    width: 50%;
    text-align: center;
    text-transform: capitalize;
    color: white;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 6px;
  }

  #btn-buy {
    background: #555;
    margin-right: 5px;
  }

  #btn-view {
    background: teal;
    margin-left: 5px;
  }

  .product-card input {
    position: absolute;
    width: 25px;
    height: 25px;
  }
`;
