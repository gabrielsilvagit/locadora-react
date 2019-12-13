import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, CleaningList } from './styles';

import api from '../../services/api';

class Cleaning extends Component {
  state = {
    plate: '',
    start_date: '',
    notes: '',
    error: '',
    cleanings: [],
  };

  async componentDidMount() {
    const cleanings = await api.get('cleanings');
    console.log(cleanings);

    this.setState({ cleanings: cleanings.data.data });
  }

  handleRegisterCleaning = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const cleanings = this.state.cleanings;

    return (
      <>
        <CleaningList>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Employee Name</th>
                <th>Category</th>
                <th>Vehicle</th>
                <th>Start Data</th>
                <th>End Data</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {cleanings.map(cleaning => (
                <tr key={cleaning.id}>
                  <td>{cleaning.type}</td>
                  <td>{cleaning.user.name}</td>
                  <td>{cleaning.category.name}</td>
                  <td>{cleaning.vehicle.plate}</td>
                  <td>{cleaning.start_date}</td>
                  <td>{cleaning.end_date}</td>
                  <td>{cleaning.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CleaningList>
        <Form onSubmit={this.handleRegisterRental}>
          {this.state.error && <p>{this.state.error}</p>}
          <input type="text" placeholder="Plate" onChange={e => this.setState({ plate: e.target.value })} />
          <input
            type="datetime-local"
            placeholder="Start Date"
            onChange={e => this.setState({ start_date: e.target.value })}
          />
          <input type="text" placeholder="Notes" onChange={e => this.setState({ notes: e.target.value })} />
          <button type="submit">Register Rental</button>
        </Form>
      </>
    );
  }

  handleRegisterCleaning = async e => {
    e.preventDefault();
    const { plate, start_date, notes } = this.state;
    if (!plate || !start_date || !notes) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/cleanings', { plate, start_date, notes });
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar a manutenção.' });
      }
    }
  };
}

export default withRouter(Cleaning);
