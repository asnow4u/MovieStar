import React from 'react';
import NavTab from './NavTab';
import Search from './Search';

const NavBar = (tab) => {

	return (
		<div className="navBarContainer">
			<div className="logoContainer">
				Movie Star Logo
			</div>
	    <div className="navBar">
				<ul>
		      <li onClick={() => tab.navChangeEvent("Movie")}><NavTab name={"Movie"} current={tab.current}/></li>
		      <li onClick={() => tab.navChangeEvent("TV Show")}><NavTab name={"TV Show"} current={tab.current}/></li>
		    </ul>
			</div>
			<div className="searchBar">
				<Search changeSearchQuery={tab.changeSearchQuery}/>
			</div>
		</div>
	)
}

export default NavBar;
