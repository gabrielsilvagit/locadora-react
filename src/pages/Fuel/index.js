import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, FuelList } from './styles';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

class Fuel extends Component {
  state = {
    name: '',
    price: '',
    error: '',
    fuels: [],
  };

  async componentDidMount() {
    const response = await api.get('fuels');

    const data = response.data.data.map(fuel => ({
      ...fuel,
      priceFormatted: formatPrice(fuel.price),
    }));

    this.setState({ fuels: data });
  }

  handleRegisterFuel = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const fuels = this.state.fuels;
    console.log(fuels);
    return (
      <>
        <FuelList>
          <table>
            <thead>
              <tr>
                <th>Nome do Combustivel</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {fuels.map(fuel => (
                <tr key={fuel.id}>
                  <td>{fuel.name}</td>
                  <td>{fuel.priceFormatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </FuelList>
        <Form onSubmit={this.handleRegisterFuel}>
          {this.state.error && <p>{this.state.error}</p>}
          <input type="text" placeholder="Nome" onChange={e => this.setState({ name: e.target.value })} />
          <input type="number" placeholder="Preço" onChange={e => this.setState({ price: e.target.value })} />
          <button type="submit">Registrar combustivel</button>
        </Form>
      </>
    );
  }

  handleRegisterFuel = async e => {
    e.preventDefault();
    const { name, price } = this.state;
    if (!name || !price) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/fuels', { name, price });
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar o combustivel.' });
      }
    }
  };
}

export default withRouter(Fuel);
