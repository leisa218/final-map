import React, { Component } from 'react';
import { Link, Route, withRouter, Switch} from 'react-router-dom'
import {Icon, SideNav,SideNavItem, Button, Input} from 'react-materialize'




class SideNavWrapper extends Component {
  constructor(props){
      super(props);
  }
  state = {
    query:''

  }

  componentDidMount(){
  }

  componentDidUpdate(_, prevState) {
  }



  render() {
    console.log(this)
    const {markers, populateInWindow, searchLocations} = this.props;
    const query = this.state.query;

    return (
      <div className='sidenav'>
          {this.props.data && Array.isArray(this.props.data) && this.props.data.map((data, index) => {
              return <div key={index}>{data}</div>
          })}
        <SideNav
          trigger={<Button className='hide'> SIDE NAV</Button>}
          options={{ closeOnClick: true}}
          id='sidenav'
          >

          <a href="#" className="right" id="close-btn" aria-label="close sidebar">
            <Icon>clear</Icon>
          </a>
          <div className='slide-nav-introduction'>
            <h3>Trash Hero Refill Map</h3>
            <p>Find places where you can refill for bottle without cost.</p>
          </div>
          <SideNavItem divider />
          <SideNavItem subheader>Locations</SideNavItem>
          {markers.map((marker, index) =>(
            <SideNavItem waves key={index} onClick={() => populateInWindow(marker)}>{marker.title}</SideNavItem>
          ))}
        </SideNav>
      </div>
    );
  }
}

export default SideNavWrapper;
