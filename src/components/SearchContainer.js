import React from 'react';
import ShowTile from './ShowTile';

const SearchContainer = (shows) => {

  return (
    <div className="searchResultsContainer">
      {shows.data.map((show) => {
        return (<ShowTile key={show.id} data={show} toggleMenu={shows.toggleDetailMenu} />)
      })}
    </div>
  )
}

export default SearchContainer;
