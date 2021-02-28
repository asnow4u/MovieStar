import React from 'react';


const NavTab = (tab) => {

	return (
    <div className="navTab" style={tab.name === tab.current ? {backgroundColor: 'yellow'} : {backgroundColor: 'blue'}}>
      {tab.name}
    </div>
	)
}

export default NavTab;
