import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrapper>
      <div className='spinner'></div>
    </Wrapper>
  );
};

export default Spinner;
const Wrapper = styled.div`
  & {
    margin-top: 4rem;
    z-index: -1000;
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .spinner {
      margin-top: 5rem;
      pointer-events: none;
      width: 15rem;
      height: 15rem;
      border: 1rem solid transparent;
      border-color: #eee;
      border-top-color: #afa;
      border-radius: 50%;
      animation: loadingspin 0.7s linear infinite,
        changecolor 3s linear infinite;
    }

    @keyframes loadingspin {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes changecolor {
      20% {
        border-right-color: #8eef54;
      }
      65% {
        border-right-color: #afa;
        border-bottom-color: #72e672;
      }
    }
  }
`;
