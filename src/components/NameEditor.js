import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { AiOutlineSend } from "react-icons/ai";
import Message from "./Message";
import axios from "axios";

let server = "http://localhost:5000";

const NameEditor = ({ close, editName, currentUser }) => {
  const [name, setName] = useState(currentUser.userName);

  const [message, setMessage] = useState({
    active: false,
    status: "",
    content: "",
  });

  const showMessage = (status, content) => {
    setMessage({
      active: true,
      status,
      content,
    });
    setTimeout(() => {
      setMessage({
        active: false,
        status,
        content,
      });
    }, 2500);
  };

  const changeHandler = (e) => {
    setName(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (name === currentUser.userName) return;
    if (name.length < 3) {
      return showMessage("warning", "Name should contain at least 3 symbols");
    }

    const { data: allUsers } = await axios.get(`${server}/api/v1/users/`);
    const userWithSameName = allUsers.find((user) => {
      return user.userName.toLowerCase() === name.toLowerCase();
    });
    if (userWithSameName) {
      if (userWithSameName._id === currentUser._id) {
        showMessage("success", "Name was successfully changed!");
        editName(name);
        setTimeout(() => close(), 2000);
        return;
      }
      showMessage("error", "Sorry, this name is already taken 😔");
      return;
    }
    const isOk = await editName(name);
    isOk && showMessage("success", "Name was successfully changed!");
    !isOk && showMessage("error", "Sorry, something went wrong 😔");

    setTimeout(() => close(), 2000);
  };

  const onKeydown = ({ key }) => {
    if (key === "Escape") close();
    return;
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  return createPortal(
    <Wrapper>
      {message.active && <Message {...message} />}
      <div className='modal' onClick={close}>
        <form
          className='icon_input'
          onClick={(e) => e.stopPropagation()}
          onSubmit={submitHandler}
        >
          <input
            type='text'
            className='input'
            value={name}
            onChange={changeHandler}
          />
          <button className='icon' type='submit'>
            <AiOutlineSend />
          </button>
        </form>
      </div>
    </Wrapper>,
    document.getElementById("portal")
  );
};

export default NameEditor;
const Wrapper = styled.div`
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.45);
  }
  .icon_input {
    position: relative;
    width: 30rem;
  }
  .input {
    /* text-align: center; */
    width: 100%;
    z-index: 1000;
    background-color: #fafafa;
    outline: none;
    padding: 10px 35px 10px 15px;
    border: none;
    border-radius: 15px;
    /* outline: none; */
    font-family: inherit;
    font-size: 2rem;
    /* text-transform: uppercase; */
  }
  .icon {
    cursor: pointer;
    position: absolute;
    border: none;
    background-color: transparent;
    color: black;
    top: 0.8rem;
    right: 1rem;
    font-size: 3rem;
    z-index: 10001;
  }
`;
