import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Logo from "../../assets/logo.svg";
import api from "../../services/api";

import { Form, Container } from "./styles";

class Password extends Component {
  state = {
    password: "",
    token: "",
    error: ""
  };

  handlePassword = async e => {
    e.preventDefault();
    const { password, token } = this.state;
    if (!password) {
      this.setState({ error: "Preencha sua senha para continuar!" });
    } else {
      try {
        await api.post(this.props.location.pathname, { password });
        this.props.history.push("/app");
      } catch (err) {
		console.log(token)
        this.setState({
          error:
            "Houve um problema com a senha. T.T"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handlePassword}>
          <img src={Logo} alt="Locadora logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Registrar Senha</button>
          <hr />
        </Form>
      </Container>
    );
  }
}

export default withRouter(Password);