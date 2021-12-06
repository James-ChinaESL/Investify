import React from "react";
import { createPortal } from "react-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import styled from "styled-components";

const Message = ({ active, status, content }) => {
  return createPortal(
    <Wrapper>
      <div
        className={`message_container ${active ? "active" : null}  ${status}`}
      >
        {status === "success" ? <BsCheck2Circle /> : <BiError />}
        <h2 className={`message ${status}`}>{content}</h2>
      </div>
    </Wrapper>,
    document.getElementById("portal")
  );
};

export default Message;

const Wrapper = styled.div`
  .message_container {
    z-index: 100000;
    position: fixed;
    top: 120%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* height: 10rem; */
    width: min(85rem, 95vw);
    padding: 2rem 4rem;
    opacity: 0;
    border-radius: 15px;
    box-shadow: var(--box-shadow);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.42, 0, 1, 1);
    &.active {
      top: 80%;
      opacity: 0.95;
    }
    &.success {
      background-color: #2c7c34;
    }
    &.error {
      background-color: #d32f2f;
    }
    &.warning {
      background-color: #ec6b04;
    }
    svg {
      font-size: 3.5rem;
      margin-right: 1.5rem;
      margin-left: 1.5rem;
    }
    .message {
      font-weight: bolder;
      letter-spacing: 2px;
      text-align: center;
    }
  }
`;
