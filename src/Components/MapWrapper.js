import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Map} from 'google-maps-react';
import * as WeatherAPI from '../Utils/WeatherAPI'
import SideNavWrapper from './SideNavWrapper'
import NavBarWrapper from './NavBarWrapper'
import MapFailed from './MapFailed'



class MapWrapper extends Component {
  // initial data
  // toDo: get this data from external and make it possible to add new entries
  state = {
    map:{},
    locations: [
      {title: 'Ban Bua Cottage, Thailand', location: {lat: 11.665669, lng: 102.536357}},
      {title: 'bb Divers, Thailand', location: {lat: 11.632421, lng: 102.547440}},
      {title: 'bb Dorm, Thailand', location: {lat: 11.632400, lng: 102.547408}},
      {title: 'Big Dreams Resort, Thailand', location: {lat: 11.625287, lng: 102.546876}},
      {title: 'Captain Nhong Seafood & Homestay, Thailand', location: {lat: 11.707709, lng: 102.571211}},
      {title: 'Eve House, Thailand', location: {lat: 11.609061, lng: 102.544243}},
      {title: 'Happy Days Guesthouse, Thailand', location: {lat: 11.624801, lng: 102.546994}},
      {title: 'Mermaid Fashion & Cafe, Thailand', location: {lat: 11.659266, lng: 102.539536}},
      {title: 'Paradise Divers - Koh Kood, Thailand', location: {lat: 11.625006, lng: 102.546685}},
      {title: 'Peterpan Resort, Thailand', location: {lat: 11.634626, lng: 102.545739}},
      {title: 'Seafar Resort, Thailand', location: {lat: 11.650647, lng: 102.535500}},
      {title: 'Shantaa Resort, Thailand', location: {lat: 11.654611, lng: 102.533018}},
      {title: 'Wooden Hut, Thailand', location: {lat: 11.608840, lng: 102.545173}},
      {title: 'Kuba Lounge, Thailand', location: {lat: 11.609090, lng: 102.547124}},
      {title: 'Wave F, Thailand', location: {lat: 11.664032, lng: 102.536331}},
      {title: 'Koh Kood Guesthouse, Thailand', location: {lat: 11.675546, lng: 102.541105}}



    ],
    markers: [],
    initialCenter:{
      lat: 12.9037023,
      lng: 92.4381501,
    },
    icon:{},
    selectedMarker:[],
    query:'',
    searchresult:[],
    countries:[
      {title: 'germany', countriebounds:{lat:51.165691, lng:10.451526000000058}},
      {title: 'indonesia', countriebounds:{lat:-0.789275, lng:113.92132700000002}},
      {title: 'thailand', countriebounds:{lat:12.9037023, lng:92.4381501}}
    ],
    weatherdata: [],
    infoWindowstatus: false
  }

  componentDidMount(){
      this.initMap()
  }

  componentDidUpdate(_, prevState) {
    // check if there is a search or not   
    if (this.state.searchresult !== prevState.searchresult) {
        this.hideMarker();
        this.renderMarker();
      } else {
        this.showMarker();

      }
  }
  /* Initialize Google Maps
  ** enrich the data
  ** create the marker
  ** and add event handler for map
  */
  initMap = () =>{
    if(this.props && this.props.google){
      const{ google } = this.props;
      const maps = google.maps;
      const mapReference = this.refs.map;
      const mapNode = ReactDOM.findDOMNode(mapReference);
      const mapSettings = Object.assign({},{
        center: this.state.initialCenter,
        zoom: 1
      })

      this.map = new maps.Map(mapNode, mapSettings);
      //enricht the given data with google places info
      // IMPORTANT: Given locaton needs at least a Name and a City
      this.getPlacesValues();

      // draw markers on map
      this.renderMarker();
      
      const largInfoWindow = new google.maps.InfoWindow({
        maxWidth: 300
      });
      this.setState({
        largInfoWindow: largInfoWindow,
      })

      this.map.addListener('click', () =>{
        this.closeInfoWindow();
      });
    }
  }


  /* Google Places call
  ** enrich the data
  ** and hand data to state of component
  */
  getPlacesValues = () => {
    const { google } = this.props;
    const { locations } = this.state;
    const map = this.map;

    locations.forEach((location) =>{
      let request = {
          query: location.title,
          fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry','icon', 'id', 'place_id', 'types']
        }
      const service = new google.maps.places.PlacesService(map); 
      service.findPlaceFromQuery(request, (results, status)=>{
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let place of results){
            location.formatted_address = place.formatted_address
            location.geometry = place.geometry
            location.html_attributions = place.html_attributions
            location.icon = place.icon
            location.id = place.id
            location.photos = place.photos
            location.place_id = place.place_id
            location.rating = place.rating
            location.types = place.types
          }
        }
        
      }) 
    })
    this.setState({
      locations:locations
    })
  }


  /* Create Marker
  ** get data from state 
  ** loop over elements and create Marker
  ** add location info to bounds
  */
  renderMarker = () =>{
    const {google} = this.props;
    const markers= [];

    const bounds = new google.maps.LatLngBounds();
    // check if locations are filtered
    this.updateLocations();
    // use searchresult as value
    let locations = this.state.searchresult;
    // create a loop to add marker to the markers array from locations state
    locations.forEach((location,index,icon) =>{
      let marker = new google.maps.Marker({
        map:this.map,
        position: location.location,
        title: location.title,
        animation: google.maps.Animation.DROP,
        id: index,
      });
      markers.push(marker);

      bounds.extend(marker.position);

      this.map.fitBounds(bounds);

      marker.addListener('click', () =>{
        marker.setAnimation( google.maps.Animation.BOUNCE)
        setTimeout(function(){
          marker.setAnimation(null);
        }, 600);
        this.populateInWindow(marker);
      });
    })    
    this.setState({markers});   
  }

  // todo:
  setMarkerDetails = (marker) =>{
    // extract the detail parts into seperate function
  }

  /* Create Infowindow
  ** get data locations from state 
  ** call the WeatherAPI and get data based on location
  ** loop over elements and create content for Infowindow
  ** finaly open the infowindow
  */
  populateInWindow = (marker) => {
    const {map} = this;
    const {largInfoWindow, locations, infowindowstatus} = this.state;
    // Check if the infoWindow is not already opened for this marker
    if (largInfoWindow.marker !== marker) {
        largInfoWindow.marker = marker;
        // add the additonal Content
        // get the correct data from the locations array
        const location = locations.filter((location) => (location.title === marker.title))
        const locationName =  marker.title


        // select Elements from the result
        let locationCats = location.map((e) => e.types).join(',  ')
        let locationAddress = location.map((l) => l.formatted_address).join(',  ')
        // keep for later improvement
        //let locationCountry = locationAddress.split(/[, ]+/).pop();
        let lat = '';
        let lng = '';
        location.forEach((l) =>{
          lat = l.location.lat;
          lng = l.location.lng;
        })
       
        // to do: refactor to external function
        // get Conten from external API
        let apiContent = '<div id="api">...loading</div>'
        WeatherAPI.getAll(lat,lng).then((data) => {
          this.setState({weatherdata: data})
        }).then(data =>{
          let {summary} = this.state.weatherdata.daily
          let {temperature, humidity, uvIndex, windSpeed, icon} = this.state.weatherdata.currently;
          const images = require.context('../../public/images', true);
          let thisIcon = images("./icons/" + icon + ".png");
          apiContent = `
            <div>
              <p>
                <small>Weather:</small>
              </p>
              <p><strong>Summary:</strong><br/> ${summary} <img src="${thisIcon}" alt="weather icon"></p>
              <ul>
                <li><strong>Temperature:</strong>  ${temperature}</li>
                <li><strong>Humidity:</strong>  ${humidity}</li>
                <li><strong>Wind Speed:</strong>  ${windSpeed}</li>
                 <li><strong>UV Index:</strong>  ${uvIndex}</li>
              </ul>
            </div>
          `;
          largInfoWindow.setContent('<h4>'+locationName + '</h4><hr /><p><small>Address:</small><br />'+ locationAddress+ '</p><p><small>Categories:</small><br />'+locationCats+'</p><hr />'+ apiContent);

        }).catch(err =>{
            //console.log('api-error', err);
            apiContent = '<div id="api">Sorry!! Something went wrong when requesting the Weather data. Probalby the limit of daily requests is exeeded.</div>';
            largInfoWindow.setContent('<h4>'+locationName + '</h4><hr /><p><small>Address:</small><br />'+ locationAddress+ '</p><p><small>Categories:</small><br />'+locationCats+'</p><hr />'+ apiContent);
        })
        
        largInfoWindow.setContent('<h4>'+locationName + '</h4><hr /><p><small>Address:</small><br />'+ locationAddress+ '</p><p><small>Categories:</small><br />'+locationCats+'</p>');
        
        // Clear the marker property when closed
        largInfoWindow.addListener("closeclick", () => {
            largInfoWindow.setMarker = null;
        });

        //open the marker
        largInfoWindow.open(this.map, marker);
        this.setState({
          infowindowstatus: true
        })
    }
    if(largInfoWindow.marker === marker && infowindowstatus === false){
      largInfoWindow.open(this.map, marker);
      this.setState({
        infowindowstatus:true
      })
    }
    // Center map to a marker position
    map.panTo(marker.getPosition());
  };

  /* Hide Marker
  ** if new Information is available
  ** all old markers will be deleted
  */
  hideMarker = () => {
    const {markers} = this.state;

    for( let marker of markers ){
      marker.setMap(null);
    }
  }

  /* Show Marker
  ** if no new Information is available
  ** all old markers will be displayed
  */
  showMarker = () => {
    const {markers} = this.state;

    for(let marker of markers) {
      marker.setMap(this.map);
    }
  }

  /* Close Infowindow
  ** handle click event from Infowindow
  ** close window if open
  */
  closeInfoWindow = () => {
    const {largInfoWindow, infowindowstatus} = this.state;
    // check if infowindow is open
    if(infowindowstatus === true){
      largInfoWindow.setMarker = null;
      largInfoWindow.close(); 
      this.setState({
        infowindowstatus:false
      }) 
    }
  }

  /* Handle Search Input
  ** get the query and filter matching locations
  ** set matching locations to state
  ** if no query given or query is empty 
  ** set old locations as state of searchresult
  */
  searchLocations = (e) => {
    const query = e
    const match = new RegExp(query, 'i')
    const {locations} = this.state
    let searchResult
    if(query && query !==''){
      searchResult = locations.filter((location) =>  match.test(location.title))
      this.setState({
        searchresult: searchResult,
        query: query
      })
    }else{
      this.setState({
        query: '',
        searchresult: locations
      })
    }
  }

  /* Update Locations
  ** check if there is a searchresult
  ** set state of searchresult to given result
  ** if no searchresult give
  ** set old locations to state of searchresult
  */
  updateLocations =() =>{
    const{searchresult, locations} = this.state;
    if(searchresult && Object.keys(searchresult).length !== 0 && searchresult !== undefined ){
      this.setState({
        searchresult:searchresult
      })
    }else{
      this.setState({
        searchresult: locations
      })
    }
  }
  render() {

    return (
      <div className="map_content">
        <header>  
          <NavBarWrapper searchLocations={this.searchLocations} locations={this.state.locations}/>
        </header>
        <aside aria-label='off-canvas menu slide in from left'>  
          <SideNavWrapper locations={this.state.locations} markers={this.state.markers} populateInWindow={this.populateInWindow} closeInfoWindow={this.closeInfoWindow} searchLocations={this.searchLocations}/>
        </aside>
        {this.props.gmFailure === true && (
          <MapFailed />
        )}
        {this.props.gmFailure === false && (
          <main className="map_container" aria-label='google maps applicaton' role='application'>
            <Map id="map" ref='map' google={this.props.google} locations={this.state.locations}></Map>
          </main>
        )}
      </div>
    );
  }
}

export default MapWrapper;
