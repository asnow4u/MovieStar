import React from 'react';
import ShowTile from './ShowTile.js';

const ShowSlider = (shows) => {

  //Update to pass function straight through
  const activateDetailMenu = (id) => {
    shows.toggleDetailMenu(id);
  }

  return (
    <>
      <h1 className="showSliderTitle"> {shows.category} </h1>
      <div className="showSliderContainer">
        {shows.data.map(show => {
          return (<ShowTile key={show.id} data={show} toggleMenu={activateDetailMenu}/>)
        })}
      </div>
    </>
  )
}

export default ShowSlider;
