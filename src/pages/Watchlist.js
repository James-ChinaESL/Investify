import React from "react";
import { useUserContext } from "../contexts/userContext";
import Table from "../components/Table";
import styled from "styled-components";

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
        <Table list={watchlist.join(",")} />
      )}
    </Wrapper>
  );
};

export default Watchlist;
const Wrapper = styled.div`
  & {
    padding: 0 max(12rem, 2vw);
  }
  .empty_label {
    text-align: center;
    font-size: 3rem;
    margin-top: 2rem;
  }
`;
