import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import AboutUs from './AboutUs/AboutUs';
import LocationMap from '../components/LocationMap/LocationMap';
import Registration from './Registration/Registration';
import myRequests from './Requests/MyRequests';
import RequestsinMylocation from './Requests/RequestsInMyLocation';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }  

  render()
  {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route exact path="/LocationMap" component={LocationMap} />
          <Route exact path="/Registration" component={Registration} />
          <Route exact path="/MyRequests" component={myRequests} />
          <Route exact path="/RequestsinMylocation" component={RequestsinMylocation} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Content;
