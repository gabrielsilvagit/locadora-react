import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, CarModelList } from './styles';

import api from '../../services/api';

class CarModel extends Component {
  state = {
    name: '',
    brand_id: '',
    error: '',
    carmodels: [],
    brands: [],
  };

  async componentDidMount() {
    const carmodels = await api.get('carmodels');
    const brands = await api.get('brands');

    this.setState({ carmodels: carmodels.data.data, brands: brands.data.data });
  }

  handleRegisterCarModel = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const carmodels = this.state.carmodels;
    const brands = this.state.brands;

    return (
      <>
        <CarModelList>
          <table>
            <thead>
              <tr>
                <th>Modelo do carro</th>
                <th>Marca</th>
              </tr>
            </thead>
            <tbody>
              {carmodels.map(carmodel => (
                <tr key={carmodel.id}>
                  <td>{carmodel.name}</td>
                  <td>{carmodel.brand.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CarModelList>
        <Form onSubmit={this.handleRegisterCarModel}>
          {this.state.error && <p>{this.state.error}</p>}
          <input type="text" placeholder="Modelo" onChange={e => this.setState({ name: e.target.value })} />
          <select name="brand" onChange={e => this.setState({ brand_id: e.target.value })}>
            <option value="">Marca</option>
            {brands.map(brand => (
              <>
                <option value={brand.id}>{brand.name}</option>
              </>
            ))}
          </select>
          <button type="submit">Registrar Modelo</button>
        </Form>
      </>
    );
  }

  handleRegisterCarModel = async e => {
    e.preventDefault();
    const { name, brand_id } = this.state;
    if (!name || !brand_id) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/carmodels', { name, brand_id });
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar o modelo de carro.' });
      }
    }
  };
}

export default withRouter(CarModel);
