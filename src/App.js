import React, { Component } from 'react';
import Header from './components/Header';
import SearchCity from './components/SearchCity';

class App extends Component {
  
  render() {
    return (
      <div>
      	<Header />
      	<SearchCity />
      </div>
    );
  }

}

export default App;