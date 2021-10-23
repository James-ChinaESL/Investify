import React from "react";
import { useFiftyContext } from "../model.js/FiftyContent";
import Row from "../components/Row";
import styled from "styled-components";

export default function Fifty() {
  const { fiftyStocks } = useFiftyContext();

  return (
    <Wrapper>
      <div className='table'>
        {fiftyStocks.map((company, i) => {
          return <Row {...company} key={i + 1} i={i + 1}></Row>;
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .table {
    font-size: 1.6rem;
    display: grid;
    grid-template-columns: 98%;
    grid-auto-columns: max-content;
    justify-content: center;
    gap: 5px;
    // background-color: #2b2d3e;
    background-color: transparent;
  }
`;
