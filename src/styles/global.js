import { createGlobalStyle } from 'styled-components';
import dropdown from 'antd/es/dropdown/style/index.css';
import menu from 'antd/es/menu/style/index.css';

import override from './override.scss';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  ${dropdown}
  ${menu}


  ${override}

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #191920 !important;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
`;
