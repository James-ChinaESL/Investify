import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Wrapper>
      <div className='navbar'>
        <h1>Navbar</h1>
      </div>
    </Wrapper>
  );
};

export default Navbar;
const Wrapper = styled.div`
  .navbar {
    margin-bottom: 3rem;
  }
`;
