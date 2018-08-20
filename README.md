# MyReads Project - FEND React Project for Udacity's Nanodegree

This is the final Project from the FEND Udacity Nanodegree build in React.

Without any give code we should build a map app based on React. 

## Install 
- Clone this respository
- cd into final-map directory
- Run npm install in the root directory
- Run npm start to start the server
- React will open the App on https://localhost:3000

## Demo
- https://leisa218.github.io/final-map/

## Features and Goals

### Interface Design

- [x] All application components render on-screen in a responsive manner.
- [x] All application components are usable across modern desktop, tablet, and phone browsers.

### Application Functionality

- [x] Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.
- [x] A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.
- [x] Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.)
- [x] List functionality is responsive and runs error free.
- [x] Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
- [x] Clicking a marker displays unique information about a location somewhere on the page (modal, separate div, inside an infoWindow).
- [x] Any additional custom functionality provided in the app functions error-free.

### Asynchronous Data Usage

- [x] Application utilizes the Google Maps API or another mapping system and at least one non-Google third-party API (See credits )
- [x] All data requests are retrieved in an asynchronous manner using either the Fetch API or XMLHttpRequest.
- [x] Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an API doesn’t load there should be some visible indication on the page that it didn’t load. 

### Documentation

- [x] A README file is included detailing all steps required to successfully run the application.
- [x] Comments are present and effectively explain longer code procedures.

### Location Details Functionality

- [x] Functionality providing additional data about a location is provided and sourced from a 3rd party API. Information can be provided either in the marker’s infoWindow, or in an HTML element in the DOM (a sidebar, the list view, a modal, etc.)
- [x] Provide attribution for the source of additional data. For example, if using Foursquare, indicate somewhere in your UI and in your README that you are using Foursquare data.
- [x] Application runs without console errors.
- [x] Functionality is presented in a usable and responsive manner.

### Accessibility

- [x] Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus.
- [x] Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate ARIA roles are defined.
- [x] All content-related images include appropriate alternate text that clearly describes the content of the image. 

### Offline Use

- [x] When available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.

### Application Architecture

- [x] React code follows a reasonable component structure.
- [x] State control is managed appropriately: event handlers are passed as props to child components, and state is managed by parent component functions when appropriate.
- [x] There are at least 5 locations in the model. These may be hard-coded or retrieved from a data API.

## Important
CORS Policy Errow
Do get data from the Weather API you will need to enable a browser Plugin to avoid CORS Error on request. For Chrome you can find it [here](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) For Firefox you find it [here](https://addons.mozilla.org/de/firefox/addon/cors-everywhere/)


## Credits

Big thanks to all people who have helped me. Here is a list of resources where I find helful information.

- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
- Fullstackreact [Blogpost](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/) (Knowledge and React component)
- [Theming](https://react-materialize.github.io/#/)

## And Last but not Least!!

Thanks to the Team of Udacity, Google and React - To give me the possibility to learn from you ! 

