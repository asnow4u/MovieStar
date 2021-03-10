import React from 'react';

const ShowCarousel = (shows) => {

  const [currentID, setCurrentID] = React.useState(2);
  const [lastID, setLastID] = React.useState(12 -1);
  const [lappingID, setLappingID] = React.useState(-1);

  const fadeOutShow = {
    opacity: "0",
    animation: "fadeOut 3s 0s forwards"
  }

  const farLeftShowStyle = {
    height: "240px",
    width: "160px",
    opacity: "0.4",
    zIndex: "1",
    animation: "midToSmall 3s 0s forwards"
  }

  const midLeftShowStyle = {
    height: "350px",
    width: "220px",
    opacity: "0.7",
    zIndex: "2",
    animation: "largeToMid 3s 0s forwards"
  }

  const centerShowStyle = {
    height: "454px",
    width: "300px",
    opacity: "1",
    zIndex: "3",
    animation: "midToLarge 3s 0s forwards"
  }

  const midRightShowStyle = {
    height: "350px",
    width: "220px",
    opacity: "0.7",
    zIndex: "2",
    animation: "smallToMid 3s 0s forwards"
  }

  const farRightShowStyle = {
    height: "240px",
    width: "160px",
    opacity: "0.4",
    zIndex: "1",
    animation: "fadeIn 3s 0s forwards"
  }


  React.useEffect(() => {

    const updateNext = (currentID + 1) % 12;
    const updateLast = (lastID + 1) % 12;
    const updateLapping = (lappingID + 1) % 12;

    const interval = setTimeout(() => {

      if (lappingID >= 0){
        let lappingDiv = document.getElementById((lappingID).toString());
        let lastDiv = document.getElementById((lastID).toString());
        lastDiv.after(lappingDiv);
        setLastID(updateLast);
        setLappingID(updateLapping);
      } else {
        setLappingID(updateLapping);
      }

      Object.assign(document.getElementById((currentID-2 < 0 ? currentID-2 + 12 : (currentID-2) % 12).toString()).style, fadeOutShow);
      Object.assign(document.getElementById((currentID-1 < 0 ? currentID-1 + 12 : (currentID-1) % 12).toString()).style, farLeftShowStyle);
      Object.assign(document.getElementById((currentID).toString()).style, midLeftShowStyle);
      Object.assign(document.getElementById(((currentID+1) % 12).toString()).style, centerShowStyle);
      Object.assign(document.getElementById(((currentID+2) % 12).toString()).style, midRightShowStyle);
      Object.assign(document.getElementById(((currentID+3) % 12).toString()).style, farRightShowStyle);

      setCurrentID(updateNext);

    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [currentID]);


  return (
    <>
      <div className="farLeftShow" id="0">
        {shows.data[0] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[0].poster_path}/> : <></>}
      </div>
      <div className="leftShow" id="1">
        {shows.data[1] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[1].poster_path}/> : <></>}
      </div>
      <div className="centerShow" id="2">
        {shows.data[2] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[2].poster_path}/> : <></>}
      </div>
      <div className="rightShow" id="3">
        {shows.data[3] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[3].poster_path}/> : <></>}
      </div>
      <div className="farRightShow" id="4">
        {shows.data[4] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[4].poster_path}/> : <></>}
      </div>
      <div className="outsideCarouselView" id="5">
        {shows.data[5] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[5].poster_path}/> : <></>}
      </div>
      <div className="outsideCarouselView" id="6">
        {shows.data[6] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[6].poster_path}/> : <></>}
      </div>
      <div className="outsideCarouselView" id="7">
        {shows.data[7] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[7].poster_path}/> : <></>}
      </div>
      <div className="outsideCarouselView" id="8">
        {shows.data[8] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[8].poster_path}/> : <></>}
      </div>
      <div className="outsideCarouselView" id="9">
        {shows.data[9] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[9].poster_path}/> : <></>}
      </div>
      <div className="outsideCarouselView" id="10">
        {shows.data[10] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[10].poster_path}/> : <></>}
      </div>
      <div className="outsideCarouselView" id="11">
        {shows.data[11] ? <img className="carouselImage" src={'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + shows.data[11].poster_path}/> : <></>}
      </div>
    </>
  )
}

export default ShowCarousel;
