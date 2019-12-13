import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Form, MaintenanceList } from './styles';

import api from '../../services/api';

class Maintenance extends Component {
  state = {
    plate: '',
    start_date: '',
    notes: '',
    error: '',
    maintenances: [],
  };

  async componentDidMount() {
    const maintenances = await api.get('maintenances');
    console.log(maintenances);

    this.setState({ maintenances: maintenances.data.data });
  }

  handleRegisterMaintenance = e => {
    e.preventDefault();
    alert('Eu vou te registrar');
  };

  render() {
    const maintenances = this.state.maintenances;

    return (
      <>
        <MaintenanceList>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Employee Name</th>
                <th>Category</th>
                <th>Vehicle</th>
                <th>Start Data</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {maintenances.map(maintenance => (
                <tr key={maintenance.id}>
                  <td>{maintenance.type}</td>
                  <td>{maintenance.user.name}</td>
                  <td>{maintenance.category.name}</td>
                  <td>{maintenance.vehicle.plate}</td>
                  <td>{maintenance.start_date}</td>
                  <td>{maintenance.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </MaintenanceList>
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

  handleRegisterMaintenance = async e => {
    e.preventDefault();
    const { plate, start_date, notes } = this.state;
    if (!plate || !start_date || !notes) {
      this.setState({ error: 'Algo está faltando.' });
    } else {
      try {
        await api.post('/maintenances', { plate, start_date, notes });
        this.props.history.push('/dashboard');
      } catch (err) {
        console.log(err);
        this.setState({ error: 'Ocorreu um erro ao registrar a manutenção.' });
      }
    }
  };
}

export default withRouter(Maintenance);
