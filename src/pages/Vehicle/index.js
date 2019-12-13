import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, VehicleList } from './styles';

import api from '../../services/api';

class Vehicle extends Component {
  state = {
    plate: '',
    chassi: '',
    carmodel_id: '',
    fuel_id: '',
    category_id: '',
    model_year: '',
    make_year: '',
    error: '',
    vehicles: [],
    carmodels: [],
    fuels: [],
    categories: [],
  };

  async componentDidMount() {
    const vehicles = await api.get('vehicles');
    const carmodels = await api.get('carmodels');
    const fuels = await api.get('fuels');
    const categories = await api.get('categories');

    this.setState({
      vehicles: vehicles.data.data,
      carmodels: carmodels.data.data,
      fuels: fuels.data.data,
      categories: categories.data.data,
    });
  }

  handleRegisterVehicle = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const vehicles = this.state.vehicles;
    const carmodels = this.state.carmodels;
    const fuels = this.state.fuels;
    const categories = this.state.categories;
    return (
      <>
        <VehicleList>
          <table>
            <thead>
              <tr>
                <th>Plate</th>
                <th>Chassi</th>
                <th>Car Model</th>
                <th>Fuel</th>
                <th>Category</th>
                <th>Model year</th>
                <th>Make year</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td>{vehicle.plate}</td>
                  <td>{vehicle.chassi}</td>
                  <td>{vehicle.carmodel.name}</td>
                  <td>{vehicle.fuel.name}</td>
                  <td>{vehicle.category.name}</td>
                  <td>{vehicle.model_year}</td>
                  <td>{vehicle.make_year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </VehicleList>
        <Form onSubmit={this.handleRegisterVehicle}>
          {this.state.error && <p>{this.state.error}</p>}
          <input type="text" placeholder="Plate" onChange={e => this.setState({ plate: e.target.value })} />
          <input type="text" placeholder="Chassi" onChange={e => this.setState({ chassi: e.target.value })} />
          <select name="carmodel" onChange={e => this.setState({ carmodel_id: e.target.value })}>
            <option value="">Car Model</option>
            {carmodels.map(carmodel => (
              <>
                <option value={carmodel.id}>{carmodel.name}</option>
              </>
            ))}
          </select>
          <select name="fuel" onChange={e => this.setState({ fuel_id: e.target.value })}>
            <option value="">Fuel</option>
            {fuels.map(fuel => (
              <>
                <option value={fuel.id}>{fuel.name}</option>
              </>
            ))}
          </select>
          <select name="category" onChange={e => this.setState({ category_id: e.target.value })}>
            <option value="">Category</option>
            {categories.map(category => (
              <>
                <option value={category.id}>{category.name}</option>
              </>
            ))}
          </select>
          <input
            type="text"
            placeholder="Ano de modelo"
            onChange={e => this.setState({ model_year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ano de fabricação"
            onChange={e => this.setState({ make_year: e.target.value })}
          />
          <button type="submit">Registrar Veículo</button>
        </Form>
      </>
    );
  }

  handleRegisterVehicle = async e => {
    e.preventDefault();
    const { plate, chassi, carmodel_id, fuel_id, category_id, model_year, make_year } = this.state;
    if (!plate || !chassi || !carmodel_id || !fuel_id || !category_id || !model_year || !make_year) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/vehicles', { plate, chassi, carmodel_id, fuel_id, category_id, model_year, make_year });
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar o veiculo.' });
      }
    }
  };
}

export default withRouter(Vehicle);
