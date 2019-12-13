import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Message } from './styles';

class PageNotFound extends Component {
  render() {
    return <Message>Ei, você não deveria estar aqui!</Message>;
  }
}

export default withRouter(PageNotFound);
