import React from "react";
import { Card } from "react-bootstrap";

const AboutUs = () => (
  <div>
    <br />
    <div className="row" style={{ width: "100%", marginLeft: "0.02rem" }}>
      <div className="col-md-12">
        <Card style={{ fontStyle: "italic" }}>
          <Card.Header>About Us</Card.Header>
          <Card.Body style={{ color: "#6c757d", fontSize: "80%" }}>
            <p>Founded in Kolkata in 2020, </p>
            <p>
              [Team Name] is a mass membership organization and network of
              people organizing for helping our communities. The idea is,
              organizing our communities and fighting for a better quality of
              life against the recent Corona outbreak. We believe that the only
              way we’ll see meaningful action is if we can counter the emergency
              situation with the power of people by taking collective action.
              Everyone has the right to have the supplies of basic commodities
              and [Team Name] is taking care of establishing community
              cooperation to help our neighborhood amid lockdown. Every day we
              hear the issues facing our communities regarding daily supplies
              and health problems. To cater to all these problems the only
              solution is for our volunteers to get organized and help our
              communities. Our volunteers are always happy to help our
              communities to provide their daily supplies like Grocery, Baby
              Food, Medicine, etc. On an emergency call, we also provide
              healthcare support. We invite all the young groups from various
              professions to support the elderly. We know we will win because
              we’ve already started.
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
);

export default AboutUs;
