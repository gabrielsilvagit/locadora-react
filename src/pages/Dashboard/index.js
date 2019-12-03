import React, { Component } from 'react';
import api from "../../services/api";

import './styles.css';

export default class Product extends Component {
	state = {
		dashboard: {},

	};

	async componentDidMount() {
		const response = await api.get(`/dashboard`);

		this.setState({ product: response.data });
	}

	render () {
		const { product} = this.state;

		return (
			<div className="product-info">
				<h1>{product.title}</h1>
				<p>{product.description}</p>

			<p>
				URL: <a href={product.url}>{product.url}</a>
			</p>
			</div>
		);
	}
}



const { 
	todayRentals,
	nextsRentals,
	nextsDropoffs,
	maintenanceVehicles,
	cleaningVehicles,
	vehiclesPerCatergory
	} = this.state;