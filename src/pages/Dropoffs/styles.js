import styled from 'styled-components';

export const Form = styled.form`
  margin: 15px auto auto;
  width: 50%;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
	width: 200px;
    margin: 10px 0 40px;
  }
  p {
    color: #191920;
    margin-bottom: 15px;
    border: 1px solid #191920;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    display: flex
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #191920;
    font-size: 16px;
    background: #ffff00;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }

    select {
    display: flex
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
`;
