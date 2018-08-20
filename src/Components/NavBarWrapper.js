import React, { Component } from 'react';
import { Debounce } from 'react-throttle';
import { Link, Route, withRouter, Switch} from 'react-router-dom'
import {Navbar,Input, Row, NavItem, Icon} from 'react-materialize'


class NavBarWrapper extends Component {
  state = {
    query:''
  }

  componentDidMount(){
  }

  componentDidUpdate(_, prevState) {
  }

  render() {
    const{searchLocations} = this.props;
    const query = this.state.query;
    return (
      <div className='navbar_wrapper'>
        <Navbar brand='logo' className='yellow darken-1' right>
          <Debounce time="400" handler="onChange">
            <Input placeholder="Search" s={6} label="Search" inline={true} className='search_bar' icon='search' onChange={(e) => searchLocations(e.target.value)}/>
          </Debounce>
          <NavItem data-activates="sidenav"><Icon>dehaze</Icon></NavItem>
          <NavItem href='#'><Icon>more_vert</Icon></NavItem>
        </Navbar>
      </div>
    );
  }
}

export default NavBarWrapper;
