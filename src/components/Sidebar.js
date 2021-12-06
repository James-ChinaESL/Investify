import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import styled from "styled-components";
import Title from "./Title";
import MarketClock from "./MarketClock";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const { currentUser } = useUserContext();

  return (
    <Wrapper>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className='sidebar-header'>
          <Title small />
          <button className='close-btn' onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <div className='clock-container'>
          <MarketClock />
        </div>
        <div className='sidebar-links'>
          <Link to='/' onClick={closeSidebar}>
            Stocks
          </Link>

          <Link to='/watchlist' onClick={closeSidebar}>
            Watchlist
          </Link>
          <Link
            to={`/portfolio/${currentUser.userName}`}
            onClick={closeSidebar}
          >
            MyPortfolio
          </Link>

          <Link to={"/allplayers"} onClick={closeSidebar}>
            AllPlayers
          </Link>
        </div>
      </aside>
    </Wrapper>
  );
};

export default Sidebar;
const Wrapper = styled.div`
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--clr-secondary);
    display: grid;
    grid-template-rows: 8rem 6rem 1fr;
    row-gap: 1rem;
    box-shadow: var(--box-shadow);
    transition: 0.3s all linear;
    transition-delay: 150ms;

    transform: translate(-100%);
    z-index: 10000;
  }
  .show-sidebar {
    transform: translate(0);
  }
  .sidebar-header {
    align-self: end;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1.5rem 0;
  }
  .close-btn {
    font-size: 3.2rem;
    background: transparent;
    border-color: transparent;
    color: #fa5555;
    transition: var(--transition);

    cursor: pointer;
    margin-top: 0.8rem;
  }
  .close-btn:active {
    transform: scale(0.9);
  }
  .sidebar-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    & a {
      width: 100%;
      padding: 1.5rem 3rem;
      text-decoration: none;
      font-size: 2.2rem;
      text-transform: capitalize;
      /* padding: 1rem 1.5rem; */
      color: white;
      transition: var(--transition);
      letter-spacing: 1px;
      &:hover {
        background-color: var(--clr-primary-hover);
        text-shadow: 4px 1px 14px rgba(255, 255, 255, 0.8);
      }
      &:active {
        transform: scale(0.95);
        /* background-color: var(--clr-primary-hover); */
        text-shadow: 4px 1px 14px rgba(255, 255, 255, 0.8);
      }
    }
  }
  .clock-container {
    padding: 0 1.5rem;
    font-size: 2rem;
  }
`;
