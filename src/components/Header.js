import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class Header extends Component {
	render() {
		return (
			<Navbar fixed="top" bg="dark" variant="dark">
			    <Navbar.Brand>Weather App</Navbar.Brand>
			</Navbar>
		)
	}
}

export default Header;