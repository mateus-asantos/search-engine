import React, { Component } from 'react';
import './App.css';
import SearchField from './components/SearchField';
import AddField from './components/AddField';

class App extends Component {


  render() {
    return (
      <div className="App">
        <SearchField />
        <br/><br/>
        <AddField />
      </div>
    );
  }
}

export default App;
