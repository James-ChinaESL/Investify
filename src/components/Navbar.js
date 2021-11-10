import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, userName } =
    useUserContext();

  return (
    <Wrapper>
      <div className='navbar'>
        <Link className='btn' to='/'>
          Home
        </Link>
        <Link className='btn' to='/stocks'>
          Stocks
        </Link>
        <Link className='btn' to='/watchlist'>
          Watchlist
        </Link>
        <Link className='btn' to={`/portfolio/${userName}`}>
          MyPortfolio
        </Link>
        <button className='btn' onClick={loginWithRedirect}>
          Login/Sign up
        </button>
        <button
          className='btn'
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
        <button className='btn'>{userName}</button>
      </div>
    </Wrapper>
  );
};

export default Navbar;
const Wrapper = styled.div`
  .navbar {
    margin: 2rem 3rem;
    text-align: right;
  }

  .btn {
    padding: 1rem 2rem;
    margin: 2rem 3rem;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    border-radius: 15px;
  }
  button.btn {
    padding: 1rem 2rem;
    margin: 2rem 3rem;
    font-size: 2rem;
    border-radius: 15px;
    color: black;
    cursor: pointer;
  }
`;
