import React from "react";
import { useUserContext } from "../contexts/userContext";
import Table from "../components/Table";
import styled from "styled-components";
import { MainWithPadding } from "../utils/commonPadding";

const Watchlist = () => {
  const { allUsers, currentUser } = useUserContext();
  const { watchlist } =
    allUsers?.find((user) => user._id === currentUser._id) || {};
  if (!watchlist) return null;

  return (
    <Wrapper>
      <h1>Watchlist</h1>
      {watchlist.length === 0 ? (
        <h2 className='empty_label'>Your wathclist is currently empty</h2>
      ) : (
        <Table type='watchlistStocks' list={watchlist.join(",")} />
      )}
    </Wrapper>
  );
};

export default Watchlist;
const Wrapper = styled(MainWithPadding)`
  h1 {
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 2rem;
    font-size: 3.3rem;
  }
  .description {
    display: none;
  }
  .empty_label {
    text-align: center;
    font-size: 3rem;
    margin-top: 2rem;
  }
`;
