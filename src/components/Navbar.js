import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "../contexts/userContext";
import { useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NameEditor from "./NameEditor";
import SearchStocks from "./SearchStocks";
import Title from "./Title";
import MarketClock from "./MarketClock";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

const Navbar = React.memo(() => {
  const { logout } = useAuth0();
  const { currentUser, editName } = useUserContext();
  const [isNameEditorOpened, setIsNameEditorOpened] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const nameButton = useRef(null);

  const path = useLocation().pathname;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const logoutHandler = () => {
    setAnchorEl(null);
    logout();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const editNameHandler = () => {
    setAnchorEl(null);
    setIsNameEditorOpened(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      {isNameEditorOpened && (
        <NameEditor
          close={() => setIsNameEditorOpened(false)}
          editName={editName}
          currentUser={currentUser}
        />
      )}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      <nav className='navbar'>
        <button onClick={openSidebar} className='sidebar-toggle'>
          <FaBars />
        </button>

        {currentUser.userName && (
          <>
            <div className='title-container'>
              <Title />
            </div>

            <div className='links'>
              <Link className={`btn ${path === "/" ? "active" : null}`} to='/'>
                Stocks
              </Link>

              <Link
                className={`btn ${path === "/watchlist" ? "active" : null}`}
                to='/watchlist'
              >
                Watchlist
              </Link>
              <Link
                className={`btn ${
                  path === `/portfolio/${currentUser.userName}`
                    ? "active"
                    : null
                }`}
                to={`/portfolio/${currentUser.userName}`}
              >
                MyPortfolio
              </Link>

              <Link
                className={`btn ${path === "/allplayers" ? "active" : null}`}
                to={"/allplayers"}
              >
                AllPlayers
              </Link>
            </div>
          </>
        )}
        {currentUser.userName && (
          <>
            <button
              className='btn name name-button'
              id='basic-button'
              aria-controls='basic-menu'
              aria-haspopup='false'
              aria-expanded={open ? false : undefined}
              style={{
                minWidth: "12rem",
              }}
              ref={nameButton}
              onClick={handleClick}
            >
              {currentUser.userName}
            </button>

            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                ".MuiPaper-root ": {
                  minWidth: "12rem",
                  width: nameButton.current
                    ? getComputedStyle(nameButton.current).width
                    : `120px`,
                  boxSizing: "content-box",

                  marginTop: "-2px",
                  marginRight: "0px",
                  border: "2px solid var( --clr-primary)",
                  backgroundColor: "var( --clr-primary)",
                  boxShadow: "1px 1px 3px black 0.2",
                },
                ".MuiList-root": {
                  backgroundColor: "var( --clr-primary)",
                  color: "#fafafa",
                  fontFamily: "Cabin",
                  padding: 0,
                },
                ".MuiMenuItem-root": {
                  backgroundColor: "var( --clr-primary)",
                  justifyContent: "center",
                  padding: "0.5rem 1rem",
                  margiBottom: "0.3rem",
                  fontSize: "1.7rem",
                  fontFamily: "Cabin",
                  letterSpacing: "1px",
                  minHeight: "2rem",
                  // lineHeight: "1.7rem",
                  border: "2px solid transparent",
                  "&:hover": {
                    border: "2px solid #afa",
                    backgroundColor: "#293c55",
                    borderRadius: "5px",
                  },
                },
              }}
            >
              <div>
                <MenuItem onClick={editNameHandler} sx={{}}>
                  Edit name
                </MenuItem>

                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </div>
            </Menu>
          </>
        )}
      </nav>
      <div className='clock_and_search'>
        <div className='clock-wrapper'>
          <div className='clock'>
            <MarketClock />
          </div>
        </div>

        <div className='search'>
          <SearchStocks />
        </div>
      </div>
    </Wrapper>
  );
});

export default Navbar;
const Wrapper = styled.div`
  & {
    position: relative;
    margin-bottom: 3rem;
    padding: 3rem min(5rem, 5vw) 0;

    .navbar {
      position: relative;

      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      .sidebar-toggle {
        display: none;
      }

      /* text-align: right;  */
      .links {
        display: flex;
        justify-content: space-between;
        min-width: max(45rem, 45vw);
      }
      .btn {
        display: inline-block;
        transition: background-color 0.2s;
        text-shadow: var(--text-shadow);
        user-select: none;
        color: whitesmoke;
        font-size: 2rem;
        cursor: pointer;
        text-decoration: none;
        font-family: var(--ff-big-numbers);
        letter-spacing: 1px;
        padding: 0.3rem 0.6rem;
        border: 2px solid transparent;
        border-radius: 5px;

        &:hover {
          border: 2px solid #afa;
        }
        &:active {
          transform: scale(0.97);
          color: #afa;
        }

        &.active {
          color: #afa;
          color: var(--clr-primary);
          font-weight: bolder;
          text-shadow: -2px 0px 2px rgba(255, 255, 255, 0.4);
          background-color: #afa;
        }
      }
      button.btn {
        &.name {
          text-decoration: none;
          background-color: var(--clr-primary);
          padding: 0.5rem;
          border-radius: 5px;
          text-shadow: none;
          transition: 0.3s;
          border: 2px solid #afa;
          min-width: 120px;
          /* color: red; */
          /* font-size: 1.8rem; */
        }
      }
    }

    .clock_and_search {
      display: flex;
      justify-content: space-between;
      align-items: start;
      .search {
        /* display: flex; */
        /* position: absolute; */
        /* right: 0;
      bottom: 0; */
        font-size: 1.8rem;
        /* margin-left: 5rem; */
        letter-spacing: 1px;
      }
    }

    @media (max-width: 920px) {
      .title-container {
        display: none;
      }
      .navbar div.links {
        min-width: max(45rem, 65vw);
      }
    }
    @media (max-width: 650px) {
      .navbar {
        justify-content: space-between;
        .sidebar-toggle {
          display: block;
          line-height: 0;
          /* position: fixed;
          top: 2rem;
          left: 3rem; */
          font-size: 3.6rem;
          background: transparent;
          border-color: transparent;
          color: #afa;
          transition: var(--transition);
          cursor: pointer;
          animation: bounce 2s ease-in-out infinite;
        }
      }
      .navbar .links {
        display: none;
      }
    }

    @media (max-width: 410px) {
      .clock_and_search {
        display: flex;
        flex-direction: column;
        align-items: end;
        .clock {
          display: none;
        }
      }
    }
  }
`;
