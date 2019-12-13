import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, CategoryList } from './styles';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

class Category extends Component {
  state = {
    name: '',
    free_daily_rate: '',
    daily_rate: '',
    extra_km_price: '',
    error: '',
    categories: [],
  };

  async componentDidMount() {
    const response = await api.get('categories');

    const data = response.data.data.map(category => ({
      ...category,
      priceFormatted: formatPrice(category.extra_km_price),
    }));

    this.setState({ categories: data });
  }

  handleRegisterCategory = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const categories = this.state.categories;

    return (
      <>
        <CategoryList>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Diaria ilimitada</th>
                <th>Diaria limitada</th>
                <th>Preço por km extra</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.free_daily_rate}</td>
                  <td>{category.daily_rate}</td>
                  <td>{category.priceFormatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CategoryList>
        <Form onSubmit={this.handleRegisterCategory}>
          {this.state.error && <p>{this.state.error}</p>}
          <input type="text" placeholder="Nome" onChange={e => this.setState({ name: e.target.value })} />
          <input
            type="text"
            placeholder="Diaria ilimitada"
            onChange={e => this.setState({ free_daily_rate: e.target.value })}
          />
          <input
            type="text"
            placeholder="Diaria limitada"
            onChange={e => this.setState({ daily_rate: e.target.value })}
          />
          <input
            type="text"
            placeholder="Preço por km extra"
            onChange={e => this.setState({ extra_km_price: e.target.value })}
          />
          <button type="submit">Registrar Categoria</button>
        </Form>
      </>
    );
  }

  handleRegisterCategory = async e => {
    e.preventDefault();
    const { name, free_daily_rate, daily_rate, extra_km_price } = this.state;
    if (!name || !free_daily_rate || !daily_rate || !extra_km_price) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/categories', { name, free_daily_rate, daily_rate, extra_km_price });
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar a categoria.' });
      }
    }
  };
}

export default withRouter(Category);
