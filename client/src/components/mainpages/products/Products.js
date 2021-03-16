import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import styled from "styled-components";

export default function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
      console.log(product.checked);
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading) return <div className="products">{<Loading />}</div>;

  return (
    <ProductWrapper>
      <Filters />

      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}

      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>

      <LoadMore />

      {products.length === 0 && <Loading />}
    </ProductWrapper>
  );
}

const ProductWrapper = styled.div`
  .products {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    justify-content: center;
    margin: 20px 0;
  }

  /* Product Item */
  @import url("../utils/productItem/productItem.css");

  .delete-all {
    text-align: right;
    margin: 20px;
  }

  .delete-all input {
    height: 25px;
    width: 25px;
    transform: translateY(5px);
    margin: 0 15px;
  }

  .delete-all span {
    text-transform: uppercase;
    color: rgb(3, 165, 206);
    letter-spacing: 1.3px;
  }

  .delete-all button {
    border: 1px solid crimson;
    padding: 10px 25px;
    color: crimson;
    text-transform: uppercase;
  }

  /* ------------ Filters Menu ----------------- */
  .filter-menu {
    padding-top: 5rem;
    width: 100%;
    min-height: 40px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 15px 0;
  }
  .filter-menu select,
  input {
    border: 1px solid #ccc;
    outline: none;
    height: 40px;
    padding: 0 5px;
  }
  .filter-menu input {
    flex: 1;
    margin: 0 10px;
  }

  /* -------------------- Load More --------------- */
  .load-more {
    text-align: center;
  }
  .load-more button {
    color: crimson;
    padding: 10px 25px;
    margin-bottom: 20px;
    border: 1px solid #555;
    text-transform: capitalize;
    font-size: large;
  }
`;
