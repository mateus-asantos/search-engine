import React, { Component } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import SearchField from './components/SearchField';
import AddField from './components/AddField';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      refreshProps:0
    }
  }
  refresh= () =>{
    this.setState({
      refreshProps:this.state.refreshProps+1
    })
  }
  render() {
    return (
      <div className="App">
        <Typography variant="h6" component="h3" className="Title">
          Search Engine
        </Typography>
        <AddField onRequestTypes={()=>this.refresh()}/>
        <SearchField refresh={this.state.refresh}/>
      </div>
    );
  }
}

export default App;
