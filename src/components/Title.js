import React from "react";
import styled from "styled-components";

const Title = React.memo(({ small }) => {
  return (
    <Wrapper small={small}>
      <div className='title'>
        <span>I</span>
        <span>N</span>
        <span>V</span>
        <span>E</span>
        <span>$</span>
        <span>T</span>
        <span>I</span>
        <span>F</span>
        <span>Y</span>
      </div>
    </Wrapper>
  );
});

export default Title;

const Wrapper = styled.div`
  & {
    min-width: 26rem;

    .title {
      /* margin-bottom: 1.5rem; */
      display: inline-block;
      user-select: none;
      font-family: "Goldman", cursive;
      cursor: default;
      letter-spacing: 2px;
      font-size: ${({ small }) => {
        console.log(small);
        return small ? "2.7rem" : "4rem";
      }};
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(
        to right,
        #72e672,
        #afa,
        #8eef54,
        #72e672,
        #8eef54,
        #afa
      );
      background-size: 300% 100%;

      text-shadow: 0.5rem 1rem 2rem rgba(0, 0, 0, 0.4);
      transition: all 0.4s ease-in-out;
      &:hover {
        background-position: 100% 0;

        text-shadow: 0.5rem 1rem 2rem rgba(0, 0, 0, 0.2);
      }
      span {
        display: inline-block;
        top: 0;
        transition: top 0.3s;
      }
      span:hover {
        position: relative;
        top: -5px;
        transform: scale(1.05);
        color: #afa;
      }
    }
  }
`;
