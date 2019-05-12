import React, { Component } from "react";
import axios from "axios";
import WeatherDisplay from './WeatherDisplay';

class SearchCity extends Component {

	constructor() {
		super();
		this.state = {
			city: "",
			weatherData: [],
			searchedCity: '',
			showErrMsg: false
		}
	}

	handleChange = (e) => {
		this.setState({city: e.target.value});
	}

	fetchWeather = () => {
		this.setState({city: '', weatherData: [], searchedCity: this.state.city});
		axios.get('http://api.openweathermap.org/data/2.5/forecast', {
		    params: {
		      q: this.state.city,
		      appid: "36284c60b117578ba79cbc938a51081f"
		    }
		})
		.then((response) => {
			var filteredData = [];
			if(response && response.status && response.status === 200) {
				/*API returning the weather data from  today's date.
				So taking the date from the first object and finding the average for matching date.
				when the date is changed, new date is updated in else condition.*/
				var date = response.data.list[0].dt_txt.split(' ')[0];
				var temp = 0;
				var humidity = 0;
				var pressure = 0;
				var wind = 0;
				var dataPerDay = 0;
				for(let i = 0; i < response.data.list.length; i++) {
					if(response.data.list[i].dt_txt.split(' ')[0] === date) {
						dataPerDay++;
						temp = temp + response.data.list[i].main.temp;
						humidity = humidity + response.data.list[i].main.humidity;
						pressure = pressure + response.data.list[i].main.pressure;
						wind = wind + response.data.list[i].wind.speed;
					} else {
						filteredData.push({
							date: date,
							day: new Date(date).toString().split(' ')[0],
							temp: Math.round(((temp/dataPerDay) - 273.15)),
							humidity: Math.round((humidity/dataPerDay)),
							pressure: Math.round((pressure/dataPerDay)),
							wind: Math.round((wind/dataPerDay)),
							description: response.data.list[i-1].weather[0].description
						});
						date = response.data.list[i].dt_txt.split(' ')[0];
						temp = response.data.list[i].main.temp;
						dataPerDay = 1;
					}
				}
				this.setState({weatherData: filteredData, showErrMsg: false});
			} else {
				this.setState({weatherData: [], showErrMsg: true});
			}
		})
		.catch((error) => {
			this.setState({weatherData: [], showErrMsg: true});
		});
	}

	render() {
		return (
			<div>
			  <div className="searchBox">
		      	<input className="form-control w-25 d-inline" type="email" placeholder="Enter City Name" value={this.state.city} onChange={this.handleChange} autoComplete="off"/>&nbsp;&nbsp;
		        <button className="btn btn-primary" variant="primary" onClick={this.fetchWeather} disabled={!this.state.city}>Search</button>
			  </div>
			  {this.state.weatherData.length > 0 ? <h5 className="text-center mt-4">Search results for "{this.state.searchedCity}"</h5> : null}
			  {this.state.weatherData.length === 0 && this.state.showErrMsg === true ? <h5 className="text-center mt-4">No results found for "{this.state.searchedCity}", try again.</h5> : null}
			  <WeatherDisplay weatherData={this.state.weatherData}/>
			</div>
		);
	}
}

export default SearchCity;
