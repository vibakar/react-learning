import React, { Component } from 'react';
import WeatherCard from './WeatherCard';

class WeatherDisplay extends Component {

	render() {
		return (
			<div className="card-wrapper">
				{this.props.weatherData.map((data, index) => {
					return <WeatherCard key={index} data={data}/>		
				})}
			</div>
		)
	}
}

export default WeatherDisplay;