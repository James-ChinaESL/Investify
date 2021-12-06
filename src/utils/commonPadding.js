import styled from "styled-components";

export const MainWithPadding = styled.main`
  & {
    padding: 0 12rem 3rem;
  }
  @media (max-width: 1250px) {
    & {
      padding: 0 6rem 3rem;
    }
  }
  @media (max-width: 950px) {
    & {
      padding: 0 3rem 3rem;
    }
  }
  @media (max-width: 750px) {
    & {
      padding: 0 2rem 3rem;
    }
  }
  @media (max-width: 580px) {
    & {
      padding: 0 1rem 3rem;
    }
  }
`;
