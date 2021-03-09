import React from 'react';

const ShowCarousel = (shows) => {



  const image = {
    width: "100%",
    height: "100%"
  };

  const outsideImage = {
    display: "none",
  };

  const fadeIn = {
    position: "relitive",
    height: "240px",
    width: "160px",
    opacity: "0",
    // animationName: "fadeIn",
    animationDuration: "4s",
    animationDelay: "2s",
    animationFillMode: "forwards"
  }


  return (
    <>
      <div className="farLeftShow">
        {shows.data[0] ? <img style={image} src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[0].poster_path}/> : <></>}
      </div>
      <div className="leftShow">
        {shows.data[1] ? <img style={image} src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[1].poster_path}/> : <></>}
      </div>
      <div className="centerShow">
        {shows.data[2] ? <img style={image} src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[2].poster_path}/> : <></>}
      </div>
      <div className="rightShow">
        {shows.data[3] ? <img style={image} src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[3].poster_path}/> : <></>}
      </div>
      <div className="farRightShow">
        {shows.data[4] ? <img style={image} src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[4].poster_path}/> : <></>}
      </div>
      <div style={fadeIn}>
        {shows.data[5] ? <img style={image} src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[5].poster_path}/> : <></>}
      </div>
      <div style={outsideImage}>
        {shows.data[6] ? <img style={image} src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[6].poster_path}/> : <></>}
      </div>
    </>
  )
}

export default ShowCarousel;
