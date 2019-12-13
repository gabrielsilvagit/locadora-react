import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, BrandList } from './styles';

import api from '../../services/api';

class Brand extends Component {
  state = {
    name: '',
    error: '',
    brands: [],
  };

  async componentDidMount() {
    const response = await api.get('brands');
    this.setState({ brands: response.data.data });
  }

  handleRegisterBrand = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const brands = this.state.brands;

    return (
      <>
        <BrandList>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {brands.map(brand => (
                <tr key={brand.id}>
                  <td>{brand.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </BrandList>
        <Form onSubmit={this.handleRegisterBrand}>
          {this.state.error && <p>{this.state.error}</p>}
          <input type="text" placeholder="Nome" onChange={e => this.setState({ name: e.target.value })} />
          <button type="submit">Registrar Marca</button>
        </Form>
      </>
    );
  }

  handleRegisterBrand = async e => {
    e.preventDefault();
    const { name } = this.state;
    if (!name) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/brands', { name });
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar a marca.' });
      }
    }
  };
}

export default withRouter(Brand);
