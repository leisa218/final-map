import React, { Component } from 'react';
import {Row,Col} from 'react-materialize'


class MapFailed extends Component {
  state = {

  }

  componentDidMount(){

  }
  componentDidUpdate(){

  }

  render() {
    return (
      <Row className='api-failure'>
        <Col  s={12} className='error_wrapper'>
          <h2>Ups...sorry!</h2>
          <p>Application could not start. <br /> Please try again later...</p>
          <iframe src="https://giphy.com/embed/HrydPrw0zphAs" width="100%" height="278" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
          <p>
            <a href="https://giphy.com/gifs/birdman-alejandro-gonzlez-irritu-or-the-unexpected-virtue-of-ignorance-HrydPrw0zphAs">via GIPHY</a>
          </p>
        </Col>
      </Row>
    );
  }
}

export default MapFailed;