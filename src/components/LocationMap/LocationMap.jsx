import React from 'react';
// import GoogleMapReact from 'google-map-react';
import './LocationMap.css';
import HereMap from './HereMap';

class LocationMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: {
                lat: 0,
                lng: 0
            },
            zoom: 15
        };
    }
    userLatLngNotYetSet = () => this.state.userLocation.lat === 0 && this.state.userLocation.lng === 0;

    getCurrentUserLocation = () => {
        if (navigator.geolocation && this.userLatLngNotYetSet()) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation);
        }
    }

    setUserLocation = (position) => this.setState({
        ...this.state,
        userLocation: {
            ...this.state.userLocation,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
    })

    onChildMouseEnter = (event) => {}
    onChildMouseLeave = (event) => {}

    render()
    {
        this.getCurrentUserLocation();
        const fetchingUserLocation = this.userLatLngNotYetSet();
        const testVolunteers = [
            {
                name: "Debabrata",
                location: {lat: "22.568900", lng: "88.511889"}
            },
            {
                name: "Anupam",
                isRelevant: true,
                location: {lat: "22.567234", lng: "88.513772"}
            },
            {
                name: "Poulomi",
                location: {lat: "22.564234", lng: "88.512772"}
            }
        ];
        const currentUser = {
            name: "Jatin",
            location: {lat: "22.567900", lng: "88.511089"}
        };
        return (
        <div>
            {fetchingUserLocation && "We are fetching your location information..."}
            <h1 className={fetchingUserLocation ? "hide-element" : ""}>
                Your Latiutude: {this.state.userLocation.lat} / Your Longitude: {this.state.userLocation.lng}
            </h1>
            <HereMap
                // lat="40.7128"
                // lng="-74.0060"
                lat={currentUser.location.lat}
                lng={currentUser.location.lng}
                zoom={this.state.zoom}
                apikey="xuFmS42DOyN5V8g73oGL-HlgMbJgKkAcPtOHZPe94Fs"
                theme="normal.day"
                user = {currentUser}
                volunteers = {testVolunteers}
            />
            {/* <div className="mapdiv">
                <GoogleMapReact 
                    bootstrapURLKeys={{
                        key: "AIzaSyCHg7CgrzFG67vaKXVsz6BVXD6jT1yyrlw", 
                        language: 'en'
                    }}
                    defaultCenter={{lat: 0, lng: 0}}
                    center={{lat: 22.568257, lng: 88.511875}}//{this.state.center}
                    defaultZoom={this.state.zoom}
                    onChildMouseEnter={this.onChildMouseEnter}
                    onChildMouseLeave={this.onChildMouseLeave}
                />
            </div> */}
        </div>
        );
    }
}

export default LocationMap;
