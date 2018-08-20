import React, { Component } from 'react';
import './Scss/App.css';
import { Link, Route, withRouter, Switch} from 'react-router-dom'
import { GoogleApiWrapper } from "google-maps-react";
import ApiWrapper from './Components/ApiWrapper'



class App extends Component {
  state = {

  }

  componentDidMount(){

  }
  componentDidUpdate(){

  }

  render() {
    return (
      <div className='App'>
        <ApiWrapper />
      </div>
    );
  }
}

export default App;
