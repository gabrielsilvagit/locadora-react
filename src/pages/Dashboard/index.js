import React, { Component } from 'react';

import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { DashboardList, Title, Loading } from './styles';

class Home extends Component {
  state = {
    isLoading: true,
    informations: [],
    todayRentals: [],
    nextRentals: [],
    nextDropoffs: [],
    maintenance: [],
    cleaning: [],
    vehiclePerCategory: [],
  };

  async componentDidMount() {
    const response = await api.get('dashboard');

    this.setState({
      informations: response.data.data,
      todayRentals: response.data.data[0],
      nextRentals: response.data.data[1],
      nextDropoffs: response.data.data[2],
      maintenances: response.data.data[3],
      cleanings: response.data.data[4],
      vehiclePerCategories: response.data.data[5],
      isLoading: false,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loading>
          <h1>LOADING</h1>
          <FaSpinner color="#fff" size={50} />
        </Loading>
      );
    }

    const todayrentals = this.state.todayRentals;
    const nextrentals = this.state.nextRentals;
    const nextdropoffs = this.state.nextDropoffs;
    const maintenances = this.state.maintenances;
    const cleanings = this.state.cleanings;
    const vehiclepercategories = this.state.vehiclePerCategories;

    return (
      <>
        <Title>Today Rentals</Title>
        <DashboardList>
          {todayrentals.map(todayental => (
            <ul key={todayental.id}>
              <li>
                <strong>Customer: {todayental.user.name}</strong>
                <strong>Category: {todayental.category.name}</strong>
                <strong>Start Date: {todayental.start_date}</strong>
                <strong>End Date: {todayental.end_date}</strong>
              </li>
            </ul>
          ))}
        </DashboardList>
        <Title>Next Rentals</Title>
        <DashboardList>
          {nextrentals.map(nextrental => (
            <ul key={nextrental.id}>
              <li>
                <strong>Customer: {nextrental.user.name}</strong>
                <strong>Category: {nextrental.category.name}</strong>
                <strong>Start Date: {nextrental.start_date}</strong>
                <strong>End Date: {nextrental.end_date}</strong>
              </li>
            </ul>
          ))}
        </DashboardList>
        <Title>Next Dropoffs</Title>
        <DashboardList>
          {nextdropoffs.map(nextdropoff => (
            <ul key={nextdropoff.id}>
              <li>
                <strong>Type: {nextdropoff.type}</strong>
                <strong>Customer: {nextdropoff.user.name}</strong>
                <strong>Category: {nextdropoff.category.name}</strong>
                <strong>Start Date: {nextdropoff.start_date}</strong>
                <strong>End Date: {nextdropoff.end_date}</strong>
                <strong>Car Plate: {nextdropoff.vehicle.plate}</strong>
                <strong>Car Model: {nextdropoff.vehicle.carmodel.name}</strong>
              </li>
            </ul>
          ))}
        </DashboardList>
        <Title>Maintenance</Title>
        <DashboardList>
          {maintenances.map(maintenance => (
            <ul key={maintenance.id}>
              <li>
                <strong>Category: {maintenance.category.name}</strong>
                <strong>Start Date: {maintenance.start_date}</strong>
                <strong>End Date: {maintenance.end_date}</strong>
                <strong>Car Plate: {maintenance.vehicle.plate}</strong>
                <strong>Car Model: {maintenance.vehicle.carmodel.name}</strong>
              </li>
            </ul>
          ))}
        </DashboardList>
        <Title>Cleaning</Title>
        <DashboardList>
          {cleanings.map(cleaning => (
            <ul key={cleaning.id}>
              <li>
                <strong>Category: {cleaning.category.name}</strong>
                <strong>Start Date: {cleaning.start_date}</strong>
                <strong>End Date: {cleaning.end_date}</strong>
                <strong>Car Plate: {cleaning.vehicle.plate}</strong>
                <strong>Car Model: {cleaning.vehicle.carmodel.name}</strong>
              </li>
            </ul>
          ))}
        </DashboardList>
        <Title>Vehicle Per Category </Title>
        <DashboardList>
          {vehiclepercategories.map(vehiclepercategory => (
            <ul key={vehiclepercategory.id}>
              <li>
                <strong>Plate: {vehiclepercategory.plate}</strong>
                <strong>Car Model: {vehiclepercategory.carmodel.name}</strong>
                <strong>Category: {vehiclepercategory.category.name}</strong>
                <strong>Fuel: {vehiclepercategory.fuel.name}</strong>
                <strong>Make Year: {vehiclepercategory.make_year}</strong>
                <strong>Model Year: {vehiclepercategory.model_year}</strong>
              </li>
            </ul>
          ))}
        </DashboardList>
      </>
    );
  }
}

export default Home;
