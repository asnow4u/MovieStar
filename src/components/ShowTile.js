import React from 'react';

const ShowTile = (show) => {

  return (
    <div onClick={() => show.toggleDetailMenu(show.movie.id)} className="showContainer">
      <img src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + show.movie.poster_path}/>
      <p>{show.movie.title}</p>
    </div>
  )
}

export default ShowTile;
