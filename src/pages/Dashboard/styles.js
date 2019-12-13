import styled, { keyframes } from 'styled-components';

import { darken } from 'polished';

export const DashboardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  list-style: none;
  background: #ffff10;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 20px;
    margin: 0 20px 20px;
    border-radius: 4px;

    &:hover {
      background: ${darken(0.03, '#ffff00')};
    }

    img {
      align-self: center;
      max-width: 250px;
      border-radius: 4px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #ffff00;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: 0.2s;

      &:hover {
        background: ${darken(0.03, '#ffff00')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;

export const Title = styled.h1`
  background: #ffff00;
  padding: 20px;
  margin-top: 15px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.h1`
  display: flex;
  flex-direction: row;
  margin: 20px
  align-items: center;
  justify-items: center;
  h1 {
    margin: 20px
    font-size: 50px;
    color: #fff;
  }
  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;
