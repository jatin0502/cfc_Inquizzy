import React from 'react';
import './HereMap.css';

const svgMarkup = '<svg style="left:-14px;top:-36px;" ' +
'xmlns="http://www.w3.org/2000/svg" width="200px" height="36px" >' +
'<path d="M 19 31 C 19 32.7 16.3 34 13 34 C 9.7 34 7 32.7 7 31 C 7 29.3 9.7' +
'28 13 28 C 16.3 28 19 29.3 19 31 Z" fill="#000" fill-opacity=".2"></path>' +
'<path d="M 13 0 C 9.5 0 6.3 1.3 3.8 3.8 C 1.4 7.8 0 9.4 0 12.8 C 0 16.3 1.4 ' +
'19.5 3.8 21.9 L 13 31 L 22.2 21.9 C 24.6 19.5 25.9 16.3 25.9 12.8 C 25.9 9.4 24.6 ' +
'6.1 22.1 3.8 C 19.7 1.3 16.5 0 13 0 Z" fill="#fff"></path>' +
'<path d="M 13 2.2 C 6 2.2 2.3 7.2 2.1 12.8 C 2.1 16.1 3.1 18.4 5.2 20.5 L ' +
'13 28.2 L 20.8 20.5 C 22.9 18.4 23.8 16.2 23.8 12.8 C 23.6 7.07 20 2.2 ' +
'13 2.2 Z" fill="${COLOR}"></path>' +
'<text transform="matrix( 1 0 0 1 13 10 )" x="0" y="0" fill-opacity="1" ' +
'fill="black" text-anchor="left" ' +
'font-weight="bold" font-size="13px" font-family="arial">${TEXT}</text></svg>';

class HereMap extends React.Component {
  constructor(props) {
      super(props);

      this.platform = null;
      this.map = null;

      this.state = {
          apikey: props.apikey,
          center: {
              lat: props.lat,
              lng: props.lng,
          },
          zoom: props.zoom,
          theme: props.theme,
          style: props.style,
          useHTTPS: true,
          useCIT: true
      }
  }

  getCurrentUserLocation = () => navigator.geolocation.getCurrentPosition(this.setCurrentLocation);
  setCurrentLocation = (location) => {
    const loc = {lat:location.coords.latitude, lng:location.coords.longitude}
    this.map.setCenter(loc);
    const userIcon = new window.H.map.Icon(svgMarkup.replace('${COLOR}', '#c5cf3a').replace('${TEXT}', 'You are Here!!'));
    this.map.addObject(new window.H.map.Marker(loc, {icon: userIcon}));
    if(this.props.onCurrentLocationChange) 
    {
      this.props.onCurrentLocationChange(loc);
    }
  }

  componentDidMount() {
      this.platform = new window.H.service.Platform(this.state);

      var layer = this.platform.createDefaultLayers();
      var container = document.getElementById(this.props.container_id || 'here-map');
      
      this.map = new window.H.Map(container, layer.vector.normal.map, {
          center: this.state.center,
          zoom: this.state.zoom,
        })

      var events = new window.H.mapevents.MapEvents(this.map);
      // eslint-disable-next-line
      var behavior = new window.H.mapevents.Behavior(events);
      // eslint-disable-next-line
      this.ui = new window.H.ui.UI.createDefault(this.map, layer);

      var currentLocationIconContainer = new window.H.ui.Control();
      currentLocationIconContainer.addClass('here-ctrl here-ctrl-group');

      var button = new window.H.ui.base.Element('button', 'here-ctrl-icon map_control current_location_button');
      
      currentLocationIconContainer.addChild(button);
      currentLocationIconContainer.setAlignment('top-right');
      this.ui.addControl('myControls', currentLocationIconContainer )

      if(this.props.user) {
        this.addUserToMap();
      }
      if(this.props.volunteers) {
        this.addVolunteersToMap();
      }

      if(this.props.pinCurrentLocationOnLoad)
      {
        this.getCurrentUserLocation()
      }

      const currLocationControl = document.getElementsByClassName("current_location_button")[0];
      currLocationControl.onclick =  this.getCurrentUserLocation;
  }    

  addUserToMap = () => {
    const userIcon = new window.H.map.Icon(svgMarkup.replace('${COLOR}', '#e33f36').replace('${TEXT}', this.props.user.name));
    this.map.addObject(new window.H.map.Marker(this.props.user.location, {icon: userIcon}));
  }

  addVolunteersToMap = () => {
    if (this.props.volunteers && this.props.volunteers.length > 0)
    {
      this.props.volunteers.map(volunteer =>  {
        const volunteerIcon = new window.H.map.Icon(svgMarkup.replace('${COLOR}', volunteer.isRelevant ? '#31b559' : '#437ccc').replace('${TEXT}', volunteer.name));
        this.map.addObject(new window.H.map.Marker(volunteer.location, {icon: volunteerIcon}));
      });
    }
  }

  render() {
      return (
        <div>
          <div id={this.props.container_id || "here-map"} style={{width: '100%', height: '400px', background: 'grey' }} />
        </div>
      );
  }
}

export default HereMap;
