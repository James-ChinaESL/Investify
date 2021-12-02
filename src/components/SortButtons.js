import React from "react";

import {
  CaretUp,
  CaretDown,
  CaretUpFill,
  CaretDownFill,
} from "react-bootstrap-icons";
import styled from "styled-components";

export const SortButtons = ({ type, sort, currentSort }) => {
  return (
    <Wrapper>
      {currentSort === `${type}Asc` ? (
        <CaretUpFill onClick={() => sort(`${type}`, "Asc")} />
      ) : (
        <CaretUp onClick={() => sort(`${type}`, "Asc")} />
      )}
      {currentSort === `${type}Des` ? (
        <CaretDownFill onClick={() => sort(`${type}`, "Des")} />
      ) : (
        <CaretDown onClick={() => sort(`${type}`, "Des")} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & {
    display: inline-block;
    cursor: pointer;

    position: relative;
    top: 1.2rem;
    right: 1px;
    svg {
      display: block;
      font-size: 2.3rem;
      &:first-of-type {
        margin-bottom: -1rem;
      }
    }
  }
`;
