import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Cart from "./icon/shopping-cart-solid.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <div className="nav-links">
        <ul>
          <li className="nav-link two">
            <Link to="/create_product">Create Product</Link>
          </li>
          <li className="nav-link three">
            <Link to="/category">Categories</Link>
          </li>
        </ul>
      </div>
    );
  };

  const loggedRouter = () => {
    return (
      <div className="nav-links">
        <ul>
          <li className="nav-link  log-sign four">
            <Link to="/history">History</Link>
          </li>
          <li className="nav-link log-sign five">
            <Link to="/" onClick={logoutUser}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <HeaderWrapper>
      <header>
        <div className="container">
          <input type="checkbox" id="check" />
          <div className="logo-container">
            <h1 className="logo">
              <Link to="/" className="size">
                {isAdmin ? "Admin" : "E-commerce Shop"}
              </Link>
            </h1>
          </div>
          <div className="nav-btn">
            <div className="nav-links">
              <ul>
                <li className="nav-link one">
                  <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
                </li>

                {isAdmin ? (
                  adminRouter()
                ) : (
                  <li className="nav-link two">
                    <Link to="/">Menu</Link>
                    <div className="dropdown">
                      <ul>
                        <li className="dropdown-link">
                          <Link to="/">Link 1</Link>
                        </li>
                        <li className="dropdown-link">
                          <Link to="/">Link 2</Link>
                        </li>
                        <li className="dropdown-link">
                          <Link to="/">Link 3</Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}

                <li className="nav-link four">
                  <Link to="/">About</Link>
                </li>
                {isAdmin ? (
                  ""
                ) : isLogged ? (
                  <li className="five cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                      <img src={Cart} alt="" width="30" />
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>

            <div className="log-sign five">
              {isLogged ? (
                loggedRouter()
              ) : (
                <Link to="/login" className="btn transparent">
                  Login ✥ Register
                </Link>
              )}
            </div>
          </div>
          <div className="hamburger-menu-container">
            <div className="hamburger-menu">
              <div />
            </div>
          </div>
        </div>
      </header>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  header {
    min-height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0px;
    width: 100%;
    background-color: #60b4df;
    z-index: 10;
  }

  header a {
    text-transform: uppercase;
    color: #555;
  }

  header .logo {
    flex: 1;
  }

  .cart-icon {
    position: relative;
    margin-right: 20px;
    right: -25rem;
  }
  .cart-icon span {
    background: crimson;
    border-radius: 20px;
    color: white;
    position: absolute;
    top: -10px;
    padding: 5px 7px;
    font-size: 10px;
  }

  .container {
    max-width: 65rem;
    padding: 0 2rem;
    margin: 0 auto;
    display: flex;
    position: relative;
  }

  .logo-container {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .nav-btn {
    flex: 3;
    display: flex;
  }

  .nav-links {
    flex: 2;
  }

  .log-sign {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .logo {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 4rem;
  }

  .logo .size {
    font-size: 22px;
  }

  .btn {
    display: inline-block;
    padding: 0.5rem 1.3rem;
    font-size: 0.8rem;
    border: 2px solid #fff;
    border-radius: 2rem;
    line-height: 1;
    margin: 0 0.2rem;
    transition: 0.3s;
    text-transform: uppercase;
  }

  .btn.solid,
  .btn.transparent:hover {
    background-color: #fff;
    color: #69bde7;
  }

  .btn.transparent,
  .btn.solid:hover {
    background-color: transparent;
    color: #fff;
  }

  .nav-links > ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-link {
    position: relative;
  }

  .nav-link > a {
    line-height: 4rem;
    color: #fff;
    padding: 0 0.8rem;
    letter-spacing: 1px;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.5s;
  }

  .nav-link > a > i {
    margin-left: 0.2rem;
  }

  .nav-link:hover > a {
    transform: scale(1.1);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 10rem;
    transform: translateY(10px);
    opacity: 0;
    pointer-events: none;
    transition: 0.5s;
  }

  .dropdown ul {
    position: relative;
  }

  .dropdown-link > a {
    display: flex;
    background-color: #fff;
    color: #3498db;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s;
  }

  .dropdown-link:hover > a {
    background-color: #3498db;
    color: #fff;
  }

  .dropdown-link:not(:nth-last-child(2)) {
    border-bottom: 1px solid #efefef;
  }

  .dropdown-link i {
    transform: rotate(-90deg);
  }

  .arrow {
    position: absolute;
    width: 11px;
    height: 11px;
    top: -5.5px;
    left: 32px;
    background-color: #fff;
    transform: rotate(45deg);
    cursor: pointer;
    transition: 0.3s;
    z-index: -1;
  }

  .dropdown-link:first-child:hover ~ .arrow {
    background-color: #3498db;
  }

  .dropdown-link {
    position: relative;
  }

  .dropdown.second {
    top: 0;
    left: 100%;
    padding-left: 0.8rem;
    cursor: pointer;
    transform: translateX(10px);
  }

  .dropdown.second .arrow {
    top: 10px;
    left: -5.5px;
  }

  .nav-link:hover > .dropdown,
  .dropdown-link:hover > .dropdown {
    transform: translate(0, 0);
    opacity: 1;
    pointer-events: auto;
  }

  .hamburger-menu-container {
    flex: 1;
    display: none;
    align-items: center;
    justify-content: flex-end;
  }

  .hamburger-menu {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .hamburger-menu div {
    width: 1.6rem;
    height: 3px;
    border-radius: 3px;
    background-color: #fff;
    position: relative;
    z-index: 1001;
    transition: 0.5s;
  }

  .hamburger-menu div:before,
  .hamburger-menu div:after {
    content: "";
    position: absolute;
    width: inherit;
    height: inherit;
    background-color: #fff;
    border-radius: 3px;
    transition: 0.5s;
  }

  .hamburger-menu div:before {
    transform: translateY(-7px);
  }

  .hamburger-menu div:after {
    transform: translateY(7px);
  }

  #check {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;
    z-index: 90000;
    cursor: pointer;
    opacity: 0;
    display: none;
  }

  #check:checked ~ .hamburger-menu-container .hamburger-menu div {
    background-color: transparent;
  }

  #check:checked ~ .hamburger-menu-container .hamburger-menu div:before {
    transform: translateY(0) rotate(-45deg);
  }

  #check:checked ~ .hamburger-menu-container .hamburger-menu div:after {
    transform: translateY(0) rotate(45deg);
  }

  @keyframes animation {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @media (max-width: 920px) {
    .hamburger-menu-container {
      display: flex;
    }

    #check {
      display: block;
    }

    .nav-btn {
      position: fixed;
      height: calc(100vh - 3rem);
      top: 3rem;
      left: 0;
      width: 100%;
      background-color: #69bde7;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      overflow-x: hidden;
      overflow-y: auto;
      transform: translateX(100%);
      transition: 0.65s;
    }

    #check:checked ~ .nav-btn {
      transform: translateX(0);
    }

    #check:checked ~ .nav-btn .nav-link,
    #check:checked ~ .nav-btn .log-sign {
      animation: animation 0.5s ease forwards var(--i);
    }
    .one {
      --i: 0.6s;
    }
    .two {
      --i: 0.85s;
    }

    .three {
      --i: 1.1s;
    }
    .four {
      --i: 1.35s;
    }

    .five {
      --i: 1.8s;
    }

    .nav-links {
      flex: initial;
      width: 100%;
    }

    .nav-links > ul {
      flex-direction: column;
    }

    .nav-link {
      width: 100%;
      opacity: 0;
      transform: translateY(15px);
    }

    .nav-link > a {
      line-height: 1;
      padding: 1.6rem 2rem;
    }

    .nav-link:hover > a {
      transform: scale(1);
      background-color: #50a9d6;
    }

    .dropdown,
    .dropdown.second {
      position: initial;
      top: initial;
      left: initial;
      transform: initial;
      opacity: 1;
      pointer-events: auto;
      width: 100%;
      padding: 0;
      background-color: #3183ac;
      display: none;
    }

    .nav-link:hover > .dropdown,
    .dropdown-link:hover > .dropdown {
      display: block;
    }

    .nav-link:hover > a > i,
    .dropdown-link:hover > a > i {
      transform: rotate(360deg);
    }

    .dropdown-link > a {
      background-color: transparent;
      color: #fff;
      padding: 1.2rem 2rem;
      line-height: 1;
    }

    .dropdown.second .dropdown-link > a {
      padding: 1.2rem 2rem 1.2rem 3rem;
    }

    .dropdown.second .dropdown.second .dropdown-link > a {
      padding: 1.2rem 2rem 1.2rem 4rem;
    }

    .dropdown-link:not(:nth-last-child(2)) {
      border-bottom: none;
    }

    .arrow {
      z-index: 1;
      background-color: #69bde7;
      left: 10%;
      transform: scale(1.1) rotate(45deg);
      transition: 0.5s;
    }

    .nav-link:hover .arrow {
      background-color: #50a9d6;
    }

    .dropdown .dropdown .arrow {
      display: none;
    }

    .dropdown-link:hover > a {
      background-color: #3a91bd;
    }

    .dropdown-link:first-child:hover ~ .arrow {
      background-color: #50a9d6;
    }

    .nav-link > a > i {
      font-size: 1.1rem;
      transform: rotate(-90deg);
      transition: 0.7s;
    }

    .dropdown i {
      font-size: 1rem;
      transition: 0.7s;
    }

    .log-sign {
      flex: initial;
      width: 100%;
      padding: 1.5rem 1.9rem;
      justify-content: flex-start;
      opacity: 0;
      transform: translateY(15px);
    }
  }
`;