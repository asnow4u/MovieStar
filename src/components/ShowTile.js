import React from 'react';

const ShowTile = (show) => {

  return (
    <div onClick={() => show.toggleMenu(show.data.id)} className="showTileContainer">
      <img src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + show.data.poster_path}/>
    </div>
  )
}

export default ShowTile;
