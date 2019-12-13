import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, RentalList } from './styles';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

class Rental extends Component {
  state = {
    user_id: '',
    category_id: '',
    start_date: '',
    end_date: '',
    notes: '',
    free_km: '',
    under_25: '',
    error: '',
    rentals: [],
    users: [],
    categories: [],
  };

  async componentDidMount() {
    const rentals = await api.get('rentals');
    const users = await api.get('users');
    const categories = await api.get('categories');

    const data = rentals.data.data.map(rental => ({
      ...rental,
      dailyRateFormatted: formatPrice(rental.daily_rate),
    }));

    this.setState({ rentals: data, users: users.data.data, categories: categories.data.data });
  }

  handleRegisterRental = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const rentals = this.state.rentals;
    const users = this.state.users;
    const categories = this.state.categories;
    return (
      <>
        <RentalList>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Customer Name</th>
                <th>Category</th>
                <th>Start Data</th>
                <th>End Data</th>
                <th>Daily Rate</th>
                <th>Notes</th>
                <th>Free KM</th>
                <th>Age Aditional</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map(rental => (
                <tr key={rental.id}>
                  <td>{rental.type}</td>
                  <td>{rental.user.name}</td>
                  <td>{rental.category.name}</td>
                  <td>{rental.start_date}</td>
                  <td>{rental.end_date}</td>
                  <td>{rental.dailyRateFormatted}</td>
                  <td>{rental.notes}</td>
                  <td>{rental.free_km}</td>
                  <td>x{rental.age_aditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RentalList>
        <Form onSubmit={this.handleRegisterRental}>
          {this.state.error && <p>{this.state.error}</p>}
          <select name="user" onChange={e => this.setState({ user_id: e.target.value })}>
            <option value="">User</option>
            {users.map(user => (
              <>
                <option value={user.id}>{user.name}</option>
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
          <input type="text" placeholder="Start Date" onChange={e => this.setState({ start_date: e.target.value })} />
          <input type="text" placeholder="End Date" onChange={e => this.setState({ end_date: e.target.value })} />
          <input type="text" placeholder="Notes" onChange={e => this.setState({ notes: e.target.value })} />
          <select name="freeKm" onChange={e => this.setState({ free_km: e.target.value })}>
            <option value="">Free KM</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <select name="under_25" onChange={e => this.setState({ under_25: e.target.value })}>
            <option value="">Under 25</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <button type="submit">Register Rental</button>
        </Form>
      </>
    );
  }

  handleRegisterRental = async e => {
    e.preventDefault();
    const { category_id, user_id, start_date, end_date, notes, free_km, under_25 } = this.state;
    if (!category_id || !user_id || !start_date || !end_date || !notes || !free_km || !under_25) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/rentals', { category_id, user_id, start_date, end_date, notes, free_km, under_25 });
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar o aluguel.' });
      }
    }
  };
}

export default withRouter(Rental);
