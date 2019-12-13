import styled, { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

export const Global = createGlobalStyle`
  text-decoration: none !important;
`;

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  background: #191920;
  text-decoration: none !important;
  a {
    text-decoration: none;
    &:hover {
      color: ${darken(0.05, '#ffff00')} !important;
    }
  }
  ul {
    background: #191920;
    display: flex;
    justify-content: center;
    li {
      font-size: 18px;
    }
  }
`;

export const Logo = styled.h1`
  a {
    display: flex;
    align-items: center;

    h1 {
      font-size: 40px;
      color: #ffff00;
    }
    svg {
      margin-left: 10px;
    }
  }
`;
