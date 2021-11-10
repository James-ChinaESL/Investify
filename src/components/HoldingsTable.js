import React from "react";
import styled from "styled-components";

const HoldingsTable = (list) => {
  return <div>table</div>;
};

export default HoldingsTable;

const Wrapper = styled.section`
  .table {
    font-family: var(--ff-primary);
    font-size: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    justify-content: center;
    gap: 2px;
  }
`;
