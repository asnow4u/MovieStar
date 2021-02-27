import React from 'react';
import NavTab from './NavTab';

const NavBar = (tab) => {

	return (
		<div className="navBarContainer">
	    <ul className="navBar">
	      <li onClick={() => tab.navChangeEvent("Home")}><NavTab name={"Home"} current={tab.current}/></li>
	      <li onClick={() => tab.navChangeEvent("Upcoming")}><NavTab name={"Upcoming"} current={tab.current}/></li>
	      <li onClick={() => tab.navChangeEvent("Popular")}><NavTab name={"Popular"} current={tab.current}/></li>
	      <li onClick={() => tab.navChangeEvent("Search")}><NavTab name={"Search"} current={tab.current}/></li>
	    </ul>
		</div>
	)
}

export default NavBar;
