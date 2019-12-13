import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Logo from '../../assets/logo.svg';

import { Form } from './styles';

import api from '../../services/api';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    cpf: '',
    dob: '',
    cnh: '',
    admin: '',
    error: '',
  };

  handleSignUp = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    return (
      <Form onSubmit={this.handleSignUp}>
        <img src={Logo} alt="Airbnb logo" />
        {this.state.error && <p>{this.state.error}</p>}
        <input type="text" placeholder="Nome" onChange={e => this.setState({ name: e.target.value })} />
        <input type="email" placeholder="E-mail" onChange={e => this.setState({ email: e.target.value })} />
        <input type="text" placeholder="Endereço " onChange={e => this.setState({ address: e.target.value })} />
        <input type="text" placeholder="Cidade " onChange={e => this.setState({ city: e.target.value })} />
        <input type="text" placeholder="Estado " onChange={e => this.setState({ state: e.target.value })} />
        <input type="text" placeholder="Pais " onChange={e => this.setState({ country: e.target.value })} />
        <input type="text" placeholder="CPF " onChange={e => this.setState({ cpf: e.target.value })} />
        <input type="date" placeholder="Day of Birth " onChange={e => this.setState({ dob: e.target.value })} />
        <input type="text" placeholder="cnh " onChange={e => this.setState({ cnh: e.target.value })} />
        <input type="text" placeholder="admin " onChange={e => this.setState({ admin: e.target.value })} />
        <button type="submit">Cadastrar grátis</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </Form>
    );
  }

  handleSignUp = async e => {
    e.preventDefault();
    const { name, email, address, city, state, country, cpf, dob, cnh, admin } = this.state;
    if (!name || !email || !address || !city || !state || !country || !cpf || !dob || !cnh || !admin) {
      this.setState({ error: 'Preencha todos os dados para se cadastrar' });
    } else {
      try {
        await api.post('/users', { name, email, address, city, state, country, cpf, dob, cnh, admin });
        this.props.history.push('/');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar sua conta.' });
      }
    }
  };
}

export default withRouter(SignUp);
