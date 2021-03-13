import React from 'react';


const NavTab = (tab) => {

	const border = {
		border: "2px solid black",
		backgroundColor: tab.name === tab.current ? "yellow" : "blue",
		borderRadius: tab.name === "Movie" ? '30px 0px 0px 30px' : '0px 30px 30px 0px'
	}

	return (
    <div className="navTab"	style={border}>
      {tab.name}
    </div>
	)
}

export default NavTab;
