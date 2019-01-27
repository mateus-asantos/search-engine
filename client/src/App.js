import React, { Component } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import SearchField from './components/SearchField';
import AddField from './components/AddField';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Typography variant="h6" component="h3" className="Title">
        Search Engine
        </Typography>
        <SearchField />
        <AddField />
      </div>
    );
  }
}

export default App;
