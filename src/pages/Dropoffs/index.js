import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form } from './styles';

import api from '../../services/api';

class CheckOut extends Component {
  state = {
    damage: '',
    damage_notes: '',
    clean: '',
    clean_notes: '',
    fuel_level: '',
    current_km: '',
    rental_id: '',
    rentals: [],
  };

  async componentDidMount() {
    const rentals = await api.get('rentals');

    this.setState({ rentals: rentals.data.data });
  }

  handleRegisterCheckOut = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const rentals = this.state.rentals;
    return (
      <>
        <Form onSubmit={this.handleRegisterCheckOut}>
          {this.state.error && <p>{this.state.error}</p>}
          <select name="rental" onChange={e => this.setState({ rental_id: e.target.value })}>
            <option value="">Rental</option>
            {rentals.map(rental => (
              <>
                <option value={rental.id}>
                  {rental.user.name}/{rental.category.name}
                </option>
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
          <input type="text" placeholder="Plate" onChange={e => this.setState({ plate: e.target.value })} />
          <input type="text" placeholder="Current KM" onChange={e => this.setState({ current_km: e.target.value })} />
          <input type="text" placeholder="Fuel Level" onChange={e => this.setState({ fuel_level: e.target.value })} />

          <button type="submit">Register CheckOut</button>
        </Form>
      </>
    );
  }

  handleRegisterCheckOut = async e => {
    e.preventDefault();
    const { rental_id, category_id, plate, current_km, fuel_level } = this.state;
    if (!rental_id || !category_id || !plate || !current_km || !fuel_level) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/checkouts', { rental_id, category_id, plate, current_km, fuel_level });
        this.props.history.push('/reports');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar o checkout.' });
      }
    }
  };
}

export default withRouter(CheckOut);
