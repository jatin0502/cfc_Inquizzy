import React from "react";
import DesktopBanner from "../../Images/banner-covid.jpg";
import MobileTabBanner from "../../Images/banner-covid-transpose-2.jpg";
import SmallHeightBanner from "../../Images/banner-covid-small-height.jpg";
import "../../CSS/header.css";

const Header = () => (
  <div>
    <picture>
      <source media="(max-height: 420px)" srcSet={SmallHeightBanner} />
      <source media="(max-width: 567px)" srcSet={MobileTabBanner} />
      <source media="(min-width: 568px)" srcSet={DesktopBanner} />
      <img className="responsive" src={DesktopBanner} alt="Banner"></img>
    </picture>
  </div>
);

export default Header;
