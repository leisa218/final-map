import React, { Component } from 'react';
import { Debounce } from 'react-throttle';
import {Navbar,Input,NavItem, Icon} from 'react-materialize'


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
    return (
      <div className='navbar_wrapper'>
        <Navbar brand='logo' className='yellow darken-1sidenav-trigger ' right fixed={true}>
          <NavItem href='#' className='search_bar_wrapper'>
            <Debounce time="400" handler="onChange">
              <Input placeholder="Search" s={6} label="Search" inline={true} className='search_bar' icon='search' onChange={(e) => searchLocations(e.target.value)}/>
            </Debounce>
          </NavItem>
          <NavItem data-activates="sidenav"><Icon>dehaze</Icon></NavItem>
        </Navbar>
      </div>
    );
  }
}

export default NavBarWrapper;
