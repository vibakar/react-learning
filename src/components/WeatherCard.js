import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

class WeatherCard extends Component {
	render() {
		let data = this.props.data;
		return (
			<Card className="single-card">
			  <Card.Body>
			    <h2 className="text-center">{data.temp}&#176;C</h2>
			    <Card.Text className="text-center">{data.day}</Card.Text>
			  </Card.Body>
			  <ListGroup className="list-group-flush">
			  	<ListGroupItem className="text-center"> {data.description} </ListGroupItem>
			    <ListGroupItem>
			    	Humdity <Badge pill className="float-right" variant="primary">{data.humidity}rh</Badge>
			    </ListGroupItem>
			    <ListGroupItem>
			    	Pressure <Badge pill className="float-right" variant="secondary">{data.pressure}Pa</Badge>
			    </ListGroupItem>
			    <ListGroupItem>
			    	Wind <Badge pill className="float-right" variant="info">{data.wind}km/h</Badge>
			    </ListGroupItem>
			  </ListGroup>
			</Card>
		)
	}
}

export default WeatherCard;