import React, { Component } from 'react';
import { GoogleApiWrapper } from "google-maps-react";
import MapWrapper from './MapWrapper'



class ApiWrapper extends Component {
  state = {
    gmFailure: false

  }

  /* Check if Map Api could be loaded
  ** If API could not be loaded,
  ** change view in MapWrapper
  */
  gm_authFailure = () =>{
      this.setState({
        gmFailure: true
      })
  }
  componentDidMount(){
    window.gm_authFailure = this.gm_authFailure;
  }
  componentDidUpdate(){

  }

  render() {
    return (
      <div className='Api-wrapper'>
        <MapWrapper google={this.props.google} locations={this.props.locations} gmFailure={this.state.gmFailure}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "xxxxx"
})(ApiWrapper);
